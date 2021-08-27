import { encryptPassword } from '@shared/cipher';
import { getModelForClass, pre, prop } from '@typegoose/typegoose';

@pre<User>('save', async function() {
  if (this.isModified('password')) {
    this.password = await encryptPassword(this.password);
  }
})
class User {
  @prop({ type: String, select: false })
  public password: string;

  @prop({ type: String })
  public name: string;

  @prop({ type: String })
  public email: string;

  @prop({ type: String })
  public phoneNumber: string;

  @prop({ type: Number })
  public age: number;

  @prop({ type: String })
  public genre: 'other' | 'male' | 'female';

  @prop({ type: String })
  public hobby: string;

  @prop({ default: Date.now() })
  public createdAt: Date;
}

export const UserModel = getModelForClass(User);
