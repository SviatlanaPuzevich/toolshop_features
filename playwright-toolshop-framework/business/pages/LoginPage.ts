import { Page } from '@playwright/test';
import { NavigablePage } from '../../core/index.js';
import { LoginForm } from '../components/LoginForm.js';
import { AppRoutes } from '../constants/AppRoutes.js';
import { User } from '../models/User.js';

export class LoginPage extends NavigablePage {
  protected readonly path = AppRoutes.login;

  private readonly form: LoginForm;

  constructor(page: Page) {
    super(page);
    this.form = LoginForm.on(page);
  }

  public async login(user: User): Promise<void> {
    await this.form.login(user);
  }
}
