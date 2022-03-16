import { Application } from '../declarations';
import users from './users/users.service';

import messages from './messages/messages.service';

export default function (app: Application): void {
  app.configure(users);
  app.configure(messages);
}
