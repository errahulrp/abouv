const { test, expect } = require('@playwright/test');
const { fetchOtpFromEmail } = require('../utils/mail')
const selectors = require('../utils/selectors');

test.describe('Signup and Profile Creation Flow', () => {

  test('Complete signup flow and validate each step', async ({ page }) => {

    test.setTimeout(120000); 

    await page.goto('/welcome');
    await expect(page).toHaveURL(/\/welcome/);
    await page.waitForSelector(selectors.welcomePage.getStartedBtn);
    await page.click(selectors.welcomePage.getStartedBtn);

    await expect(page).toHaveURL(/\/sign-up/);
    await page.waitForSelector(selectors.signUpPage.mobileNumber);
    await page.fill(selectors.signUpPage.mobileNumber, '9890005961');
    await page.waitForSelector(selectors.signUpPage.continueBtn);
    await page.click(selectors.signUpPage.continueBtn);

    await page.waitForSelector(selectors.signUpPage.otp);
    const otpText = await page.textContent(selectors.signUpPage.otp);
    await page.fill(selectors.signUpPage.otpInput1, otpText);
    await page.waitForSelector(selectors.signUpPage.continueBtn);
    await page.click(selectors.signUpPage.continueBtn);

    await page.waitForURL(/\/onboarding\?category=hear/);
    await expect(page).toHaveURL(/\/onboarding\?category=hear/);
    await page.waitForSelector(selectors.onboardingPages.hearOption);
    await page.click(selectors.onboardingPages.hearOption);
    await page.waitForSelector(selectors.onboardingPages.continueBtn);
    await page.click(selectors.onboardingPages.continueBtn);

    await page.waitForSelector(selectors.onboardingPages.roleOption);
    await page.waitForURL(/\/onboarding\?category=role/);
    await expect(page).toHaveURL(/\/onboarding\?category=role/);
    await page.click(selectors.onboardingPages.roleOption);
    await page.click(selectors.onboardingPages.continueBtn);

    await page.waitForURL(/\/onboarding\?category=goal/);
    await expect(page).toHaveURL(/\/onboarding\?category=goal/);
    await page.click(selectors.onboardingPages.Freelancing);
    await page.click(selectors.onboardingPages.Volunteer);
    await page.click(selectors.onboardingPages.Competitive);
    await page.waitForSelector(selectors.onboardingPages.continueBtn);
    await page.click(selectors.onboardingPages.continueBtn);

    await page.waitForURL(/\/onboarding\?category=profileSetup/);
    await expect(page).toHaveURL(/\/onboarding\?category=profileSetup/);
    await page.waitForSelector(selectors.onboardingPages.ContinueWithEmail);
    await page.click(selectors.onboardingPages.ContinueWithEmail);

    await page.waitForURL(/\/onboarding\?category=emailAuth/);
    await expect(page).toHaveURL(/\/onboarding\?category=emailAuth/);
    await page.waitForSelector(selectors.onboardingPages.placeholder);
    await page.fill(selectors.onboardingPages.placeholder, "errahul.rp@gmail.com");
    await page.waitForSelector(selectors.onboardingPages.continueBtn);
    await page.click(selectors.onboardingPages.continueBtn);

    const EmailOTP = await fetchOtpFromEmail();

    await page.waitForSelector(selectors.onboardingPages.EmailOTP);
    await page.fill(selectors.onboardingPages.EmailOTP, EmailOTP);
    await page.waitForSelector(selectors.onboardingPages.continueBtn);
    await page.click(selectors.onboardingPages.continueBtn);

    await page.fill(selectors.profileSetup.firstNameInput, 'Rahul');
    await page.waitForURL(/\/onboarding\?category=profileInfo/);
    await expect(page).toHaveURL(/\/onboarding\?category=profileInfo/);
    await page.fill(selectors.profileSetup.lastNameInput, 'Patil');
    await page.fill(selectors.profileSetup.Pincode, '416410');
    await page.waitForSelector(selectors.profileSetup.continueBtn);
    await page.click(selectors.profileSetup.continueBtn);

  });
});
