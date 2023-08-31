import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef
} from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { UsersService } from '../users/user.service';
import mongoose from 'mongoose';
import {
  ReactWithUserDto,
  MatchStatus,
  LikeWithErrorStatus,
  LikeResponseDto
} from './like.types';
import { Like, LikeWithId } from '../users/user.schema';
import { MessageService } from '../message/message.service';
import { PaginateDto, ResponsePaginateDto } from '../common/pagination.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService //private readonly messageService: MessageService
  ) {}

  async test() {
    return await this.likeRepository.test();
  }

  async getBothLikes(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getBothLikes(newId, paginateDto);
    const count = likes.count;
    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({ user: item.users[1], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getLikes(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getLikes(newId, paginateDto);
    const count = likes.count;

    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({ user: item.users[1], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getDislikes(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const dislikes = await this.likeRepository.getDislikes(newId, paginateDto);
    const count = dislikes.count;

    const page = dislikes.page;

    const newTestArray = [];
    dislikes.data.forEach((item) => {
      newTestArray.push({ user: item.users[1], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getLikeRequests(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeWithId>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getLikeRequests(newId, paginateDto);
    const count = likes.count;

    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({
        _id: item._id,
        user: item.users[0],
        status: item.status
      });
    });

    console.log('NEW TEST ARRAY: ', newTestArray);

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getBlocked(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getBlocked(newId, paginateDto);
    const count = likes.count;

    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({ user: item.users[1], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getBlockedBack(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getBlockedBack(newId, paginateDto);
    const count = likes.count;

    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({ user: item.users[1], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getBlockedBy(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getBlockedBy(newId, paginateDto);
    const count = likes.count;

    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({ user: item.users[0], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async getDislikedBy(
    id: string,
    paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<LikeResponseDto>> {
    const newId = new mongoose.Types.ObjectId(id);
    const likes = await this.likeRepository.getDislikedBy(newId, paginateDto);
    const count = likes.count;

    const page = likes.page;

    const newTestArray = [];
    likes.data.forEach((item) => {
      newTestArray.push({ user: item.users[0], status: item.status });
    });

    const dataToReturn = {
      count,
      page,
      data: newTestArray
    };

    return dataToReturn;
  }

  async reactWithUser(
    id: string,
    reactWithUserDto: ReactWithUserDto
  ): Promise<string> {
    let like: LikeWithErrorStatus;
    let message: Boolean;
    if (
      reactWithUserDto.status === MatchStatus.LIKED &&
      reactWithUserDto.likedPhotoUrl != null
    ) {
      const { likedUserId, likedPhotoUrl } = reactWithUserDto;
      const messageDto = {
        from: id,
        to: likedUserId,
        message: likedPhotoUrl
      };

      like = await this.like(id, likedUserId);
      if (like.hasErrors) {
        throw new UnauthorizedException('Error with liking');
      } else {
        message = await this.userService.sendMessage(
          like._id.toString(),
          messageDto
        );
        if (!message) {
          throw new UnauthorizedException('Error with sending message');
        } else return 'Reaction saved!';
      }
      /* try {
        console.log('STEP ONE');
        like = await this.like(id, likedUserId);
        console.log('STEP TWO');
        console.log('STATUS ', like.status);
        await this.userService.sendMessage(like._id.toString(), messageDto);
        return 'Reaction saved';
      } catch {
        console.log('COCK');
        console.log('LIKE STATUS: ', like.status);
        if (like.status === MatchStatus.ONE_LIKED) {
          await this.likeRepository.deleteLike(like._id.toString());
          throw new UnauthorizedException('Not a picture! (1)');
        } else if (like.status === MatchStatus.LIKED_BACK) {
          const likeToUpdate = new Like();
          likeToUpdate.status = MatchStatus.ONE_LIKED;
          await this.likeRepository.updateReaction(
            like._id.toString(),
            likeToUpdate
          );
          throw new UnauthorizedException('Not a picture! (2)');
        } else {
          throw new UnauthorizedException('How did you get here?');
        }
      } */
    } else if (reactWithUserDto.status === MatchStatus.DISLIKED) {
      return await this.dislike(id, reactWithUserDto.likedUserId);
    } else if (reactWithUserDto.status === MatchStatus.BLOCKED) {
      return await this.block(id, reactWithUserDto.likedUserId);
    } else if (reactWithUserDto.status === MatchStatus.UNBLOCKED) {
      return await this.unblock(id, reactWithUserDto.likedUserId);
    } else {
      throw new UnauthorizedException();
    }
  }

  async like(id: string, likedUserId: string): Promise<LikeWithErrorStatus> {
    const matchArray = [id, likedUserId];
    const doesMatchExist = await this.likeRepository.findLike(matchArray);
    const like = new Like();

    const newId = new mongoose.Types.ObjectId(id);
    const newlikedUserId = new mongoose.Types.ObjectId(likedUserId);

    let likeWithErrorStatus = null;

    if (!doesMatchExist) {
      console.log('MATCH DOESNT EXIST');

      like.users = [newId, newlikedUserId];
      like.status = MatchStatus.ONE_LIKED;
      likeWithErrorStatus = await this.likeRepository.reactWithUser(like);
      return {
        hasErrors: false,
        _id: likeWithErrorStatus._id.toString()
      };
      //return 'Reaction saved';
    } else {
      console.log('MATCH EXISTS');
      console.log(
        'IS IT TRUE OR FALSE: ',
        doesMatchExist.users[1].toString(),
        ' 2: ',
        newId.toString()
      );
      if (
        doesMatchExist.users[1].toString() === newId.toString() &&
        doesMatchExist.status === MatchStatus.ONE_LIKED
      ) {
        console.log('LIKED BACK');

        like.status = MatchStatus.LIKED_BACK;
        likeWithErrorStatus = await this.likeRepository.updateReaction(
          doesMatchExist._id.toString(),
          like
        );

        return {
          hasErrors: false,
          _id: likeWithErrorStatus._id.toString()
        };
        //return 'Reaction saved (LIKED BACK)';
      } else {
        console.log('SHIT');
        return {
          hasErrors: true,
          _id: null
        };
      }
    }
  }

  async dislike(id: string, likedUserId: string): Promise<string> {
    const matchArray = [id, likedUserId];
    const doesMatchExist = await this.likeRepository.findLike(matchArray);
    const like = new Like();

    const newId = new mongoose.Types.ObjectId(id);
    const newlikedUserId = new mongoose.Types.ObjectId(likedUserId);

    if (!doesMatchExist) {
      like.users = [newId, newlikedUserId];
      like.status = MatchStatus.DISLIKED;
      await this.likeRepository.reactWithUser(like);
      return 'Reaction saved';
    } else {
      if (
        doesMatchExist.users[1].toString() === newId.toString() &&
        doesMatchExist.status === MatchStatus.ONE_LIKED
      ) {
        like.users = [newId, newlikedUserId];
        like.status = MatchStatus.DISLIKED;
        await this.likeRepository.updateReaction(
          doesMatchExist._id.toString(),
          like
        );
        return 'Reaction saved (DISLIKED BACK)';
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  async block(id: string, likedUserId: string): Promise<string> {
    const matchArray = [id, likedUserId];
    const doesMatchExist = await this.likeRepository.findLike(matchArray);
    const like = new Like();

    const newId = new mongoose.Types.ObjectId(id);
    const newlikedUserId = new mongoose.Types.ObjectId(likedUserId);

    if (doesMatchExist) {
      if (
        doesMatchExist.status === MatchStatus.ONE_LIKED ||
        doesMatchExist.status === MatchStatus.LIKED_BACK
      ) {
        if (doesMatchExist.users[0].toString() === newId.toString()) {
          like.status = MatchStatus.BLOCKED;
        } else {
          like.status = MatchStatus.BLOCKED_BACK;
        }
        await this.likeRepository.updateReaction(
          doesMatchExist._id.toString(),
          like
        );
        return 'Reaction saved (BLOCKED / BLOCKED BACK)';
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async unblock(id: string, likedUserId: string): Promise<string> {
    const matchArray = [id, likedUserId];
    const doesMatchExist = await this.likeRepository.findLike(matchArray);
    const like = new Like();

    const newId = new mongoose.Types.ObjectId(id);
    const newlikedUserId = new mongoose.Types.ObjectId(likedUserId);

    const whereArray = [];
    whereArray.push({ message: { $regex: '.*' + 'test url' + '.*' } });
    whereArray.push({ likeId: doesMatchExist._id.toString() });

    if (doesMatchExist) {
      console.log(doesMatchExist);
      console.log(doesMatchExist.users[0].toString() === newId.toString());
      if (
        doesMatchExist.status === MatchStatus.BLOCKED &&
        doesMatchExist.users[0].toString() === newId.toString()
      ) {
        const links = await this.userService.getPhotoLinks(whereArray);
        console.log('PHOTO URLS: ', links);
        await this.userService.deleteMessages(doesMatchExist._id.toString());
      } else if (
        doesMatchExist.status === MatchStatus.BLOCKED_BACK &&
        doesMatchExist.users[1].toString() === newId.toString()
      ) {
        const links = await this.userService.getPhotoLinks(whereArray);
        console.log('PHOTO URLS: ', links);
        await this.userService.deleteMessages(doesMatchExist._id.toString());
      } else {
        throw new UnauthorizedException();
      }
      await this.likeRepository.deleteLike(doesMatchExist._id.toString());
      return 'Reaction saved (UNBLOCKED)';
    } else {
      throw new UnauthorizedException();
    }
  }

  async findLikeById(likeId: string) {
    return await this.likeRepository.findLikeById(likeId);
  }
}
