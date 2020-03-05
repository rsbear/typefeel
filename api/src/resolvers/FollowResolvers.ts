import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx, ObjectType, Field } from "type-graphql";
import { Keyboard } from "../entity/Keyboard";
import { Keyset } from "../entity/Keyset";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";


@ObjectType()
class FollowResponse {
  @Field()
  success: boolean;
  @Field(() => String)
  id: string;
}

@Resolver()
export class FollowResolvers {
  @Query(() => [Follow])
  follows() {
    return Follow.find({ relations: ['keyboard', 'keyset'] })
  }

  @Mutation(() => FollowResponse)
  @UseMiddleware(checkAuth)
  async createFollow(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
  ) {
    try {
      const user = await User.findOne(payload!.userId)
      if (!user) {
        return {
          success: false,
          message: "No user found"
        }
      }

      if (id.includes("kb_")) {
        const keyboard = await Keyboard.findOne({ id })
        const follow = await Follow.create({
          productId: id,
          keyboard,
          user
        }).save()

        const follows = !user.followIds ? [id] : [...user.followIds, id]
        await User.update({ id: user.id }, {
          followIds: follows
        })

        return {
          success: true,
          id: follow.id
        }
      }

      if (id.includes("set_")) {
        const keyset = await Keyset.findOne({ id })
        const follow = await Follow.create({
          productId: id,
          keyset,
          user
        }).save()
        const follows = !user.followIds ? [id] : [...user.followIds, id]
        await User.update({ id: user.id }, {
          followIds: follows
        })
        return {
          success: true,
          id: follow.id
        }
      }

    } catch (err) {
      console.log(err)
      throw new Error("something went wrong")
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async unfollow(
    @Arg("id") id: string,
    @Arg("productId") productId: string,
    @Ctx() { payload }: AppContext
  ) {
    try {
      const user = await User.findOne(payload!.userId)
      if (!user) throw new Error("Log in")

      await Follow.delete({ id })
      await User.update({ id: user.id }, {
        followIds: user.followIds.filter(x => x !== productId)
      })

    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }

  @Mutation(() => Boolean)
  async deleteFollow(
    @Arg("id") id: string
  ) {
    await Follow.delete({ id })
    return true
  }
}