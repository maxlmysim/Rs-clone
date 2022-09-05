import { AuthorizationText, CSSClass } from '../interface/freeText';
import { Server } from '../server/server';
import { createTag } from '../helper/helper';
import { AuthorizationView } from './authorizationView';
import { IdPages } from '../interface/typeApp';
import { singInUser } from './user';

export class AuthorizationController {
  private server: Server;

  public constructor() {
    this.server = new Server();
  }

  public async singInUser(email: HTMLInputElement, password: HTMLInputElement): Promise<void> {
    if (!this.isInputEmpty(email, password)) {
      this.server.signInUser({
        email: email.value,
        password: password.value,
      })
        .then((data): void => {
          singInUser(data);
          window.location.hash = `#${IdPages.main}`;
        })
        .catch((err) => {
          if (err.status === 404) {
            email.classList.add(CSSClass.warning);
            email.after(createTag('p', CSSClass.warningMessage, AuthorizationText.mistakeUser));
          }
          if (err.status === 403) {
            password.classList.add(CSSClass.warning);
            password.after(createTag('p', CSSClass.warningMessage, AuthorizationText.incorrectPassword));
          }
        });
    } else {
      this.addWarningEmptyInput(email, password);
    }
  }

  public async createNewUser(
    name: HTMLInputElement,
    email: HTMLInputElement,
    password: HTMLInputElement,
  ): Promise<void> {
    if (!this.isInputEmpty(name, email, password)) {
      if (this.isLengthPasswordValid(password)) {
        this.server.createNewUser({
          name: name.value,
          email: email.value,
          password: password.value,
        })
          .then(() => {
            const view = new AuthorizationView();
            view.init(view.signInView());
          })
          .catch((err) => {
            if (err.status === 422) {
              email.after(createTag('p', CSSClass.warningMessage, AuthorizationText.invalidEmail));
            }
            if (err.status === 417) {
              email.after(createTag('p', CSSClass.warningMessage, AuthorizationText.existsEmail));
            }
          });
      } else {
        this.addWarningTextInvalidatePassword(password);
      }
    } else {
      this.addWarningEmptyInput(name, email, password);
    }
  }

  private addWarningTextInvalidatePassword(password: HTMLInputElement): void {
    password.after(createTag('p', CSSClass.warningMessage, AuthorizationText.shortPassword));
  }

  private isLengthPasswordValid(password: HTMLInputElement): boolean {
    return password.value.length >= 8;
  }

  private isInputEmpty(...args: HTMLInputElement[]): boolean {
    let check = false;
    args.forEach((arg) => {
      if (!arg.value) {
        check = true;
      }
    });
    return check;
  }

  private addWarningEmptyInput(...args: HTMLInputElement[]): void {
    args.forEach((arg) => {
      if (!arg.value) {
        arg.classList.add(CSSClass.warning);
      }
    });
  }
}
