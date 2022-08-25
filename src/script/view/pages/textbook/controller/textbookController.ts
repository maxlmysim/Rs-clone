// import { MenuItemTypeMap } from '@mui/material';
import { Server } from '../../../../server/server';

export class TextbookController {
  private server: Server;

  public groupsNum = 6;

  public group: number;

  public page: number;

  public constructor() {
    this.server = new Server();
    this.group = 0;
    this.page = 0;
  }

  // public generateButtonMenuItems(menuItem: MenuItemTypeMap) {
  // }
}
