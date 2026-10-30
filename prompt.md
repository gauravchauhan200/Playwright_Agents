
======PLANNER=============

Explore the user interface of the web application at
https://www.saucedemo.com
Based on your exploration, create a test plan covering the five core user operations
that a typical end user would perform on this e-commerce demo site.

Example:
Analyze the attached PRD and generate a complete Playwright test plan.




==========GENERATOR==========
Example Prompt
Select the agent:
playwright-test-generator

Prompt 1 : To generate tests for all the scenarios from the test plan:
Generate Playwright tests for all the scenarios provided in the test plan.

Prompt 2 : To generate test for the specific scenario from the test plan:
Create a Playwright test for scenario 1.1 from test-plan.md using the Playwright test g
enerator agent


Prompt 3 : Generate Tests Using Page Object Model (POM):
Generate Playwright tests for all the test scenarios prov
ided in the test plan.
Requirements:
- Use TypeScript.
- Follow the Page Object Model (POM) design pattern.
- Create a separate Page Object class for each applicat
ion page.
- Keep page locators and reusable page actions inside t
he Page Object classes.
- Keep test assertions and business scenarios inside th
e test (.spec.ts) files.
- Use Playwright's built-in locators (getByRole, getByL
abel, getByText, getByPlaceholder, etc.) whenever possi
ble.
- Avoid XPath unless absolutely necessary.
- Write clean, readable, and maintainable code.
- Organize the generated files using the following stru
cture:
pages/
LoginPage.ts
tests/
login.spec.ts
- Reuse Page Object methods across multiple tests.
- Generate meaningful method names and comments where a
ppropriate.
- Follow Playwright and TypeScript best practices


===========HEALER==============
Prompt:
Run all the tests until every test passes.