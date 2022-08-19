export class ControllerAuthorization {
  public async singInUser(email: HTMLInputElement, password: HTMLInputElement): Promise<void> {
    if (!email.value) {
      email.classList.add('warning');
    }
    if (!password.value) {
      password.classList.add('warning');
    }
    console.log(email, '   :  ', password);
  }
}
