import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Message } from '../users/user.schema';
import { SEND_MESSAGE_EXAMPLE } from '../swagger/example';
import { MessageDto } from './message.types';
import { PaginateDto, ResponsePaginateDto } from '../common/pagination.dto';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Send message' })
  @ApiExtraModels(Message)
  @ApiBody({ examples: SEND_MESSAGE_EXAMPLE, type: MessageDto })
  @ApiResponse({
    status: 200,
    type: Message
  })
  @Post('/send-message/:likeId')
  async sendMessage(
    @Param('likeId') likeId: string,
    @Body() messageDto: MessageDto
  ): Promise<Message> {
    return await this.messageService.sendMessage(likeId, messageDto);
  }

  @ApiOperation({ summary: 'Get messages between users' })
  @ApiExtraModels(ResponsePaginateDto<Message>)
  @ApiResponse({
    status: 200,
    type: ResponsePaginateDto<Message>
  })
  @Get('/get-conversation/:likeId')
  async getConversation(
    @Param('likeId') likeId: string,
    @Query() paginateDto: PaginateDto
  ): Promise<ResponsePaginateDto<Message>> {
    return await this.messageService.getConversation(likeId, paginateDto);
  }
}