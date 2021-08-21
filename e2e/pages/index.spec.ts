import { screen } from '@testing-library/testcafe';
import 'testcafe';

fixture`Home page tests`.page(`${process.env.TESTCAFE_BASE_URL}/`);

test('it contains the login button', async (t) => {
  await t.expect(screen.queryByTestId('loginButton').exists).ok();
});
