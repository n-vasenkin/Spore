import { ListResponse, ListResponseType, UserEntity } from 'models';
import { Inject, Singleton } from 'typescript-ioc';
import { Api } from 'utils';

@Singleton
export default class UserTransport {
  @Inject api: Api;

  private USER_LIST_ENDPOINT: string = 'users';

  retrieveUserList(params?: object): Promise<ListResponseType<UserEntity>> {
    return this.api.get(this.USER_LIST_ENDPOINT, params).then(ListResponse.fromServer.bind(null, UserEntity));
  }

  updateUserInfo(user: UserEntity): Promise<UserEntity> {
    return this.api.patch(`${this.USER_LIST_ENDPOINT}/info`, { ...user.toServer(), id: 1 }).then(UserEntity.fromServer);
  }

  uploadPhoto(photoId: number): Promise<UserEntity> {
    return this.api.patch(`${this.USER_LIST_ENDPOINT}/photo`, { id: 1, photo_id: photoId }).then(UserEntity.fromServer);
  }
}
