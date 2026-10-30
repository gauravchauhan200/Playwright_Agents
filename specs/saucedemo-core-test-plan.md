# SauceDemo Core E-commerce Test Plan

## Application Overview

Functional test plan for SauceDemo (Swag Labs), a demo storefront with username/password login, a six-item product catalog, product detail pages, a shopping cart, multi-step checkout, order confirmation, and account logout. Use standard_user / secret_sauce for the primary happy paths. Each scenario is independent and starts from a fresh app state with no existing cart contents.

## Test Scenarios

### 1. Sign In

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with valid credentials and reject invalid credentials

**File:** `tests/saucedemo/sign-in.spec.ts`

**Steps:**
  1. Starting from a fresh login page, enter an invalid username and password and select Login.
    - expect: The user remains on the login page and an authentication error is displayed.
    - expect: No inventory or shopping cart page is shown.
  2. Replace the credentials with username standard_user and password secret_sauce, then select Login.
    - expect: The inventory page opens and displays the Products heading.
    - expect: The catalog contains six products and the cart indicator is empty.

### 2. Product Discovery

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse products, sort by ascending price, and inspect a product

**File:** `tests/saucedemo/product-discovery.spec.ts`

**Steps:**
  1. From a fresh app state, sign in with standard_user / secret_sauce.
    - expect: The Products catalog is displayed with six products and Name (A to Z) selected by default.
  2. Change Sort products to Price (low to high).
    - expect: The Onesie priced at $7.99 appears first, followed by the Bike Light priced at $9.99.
    - expect: The selected sort option reads Price (low to high).
  3. Open the Sauce Labs Backpack product details.
    - expect: The product detail page identifies Sauce Labs Backpack and displays its description and $29.99 price.
    - expect: An Add to cart control and a Back to products control are available.
  4. Select Back to products.
    - expect: The user returns to the catalog and the selected sort order remains Price (low to high).

### 3. Cart Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add products to the cart and remove one item

**File:** `tests/saucedemo/cart-management.spec.ts`

**Steps:**
  1. From a fresh app state, sign in with standard_user / secret_sauce and add Sauce Labs Backpack and Sauce Labs Onesie from the catalog.
    - expect: The cart indicator reflects two items.
  2. Open the cart.
    - expect: The cart lists the Backpack and Onesie with quantity 1 each.
    - expect: Continue Shopping and Checkout controls are available.
  3. Remove the Onesie from the cart.
    - expect: The Onesie is no longer listed, the Backpack remains with quantity 1, and the cart indicator reflects one item.
  4. Select Continue Shopping.
    - expect: The inventory catalog is displayed and the one-item cart state remains intact.

### 4. Checkout and Order Completion

**Seed:** `tests/seed.spec.ts`

#### 4.1. Validate required checkout fields and complete an order

**File:** `tests/saucedemo/checkout.spec.ts`

**Steps:**
  1. From a fresh app state, sign in with standard_user / secret_sauce, add Sauce Labs Backpack to the cart, and open the cart.
    - expect: The cart contains one Backpack and its Checkout control is available.
  2. Select Checkout and then Continue without entering customer information.
    - expect: Checkout remains on the Your Information step and displays a validation alert for the missing first name.
    - expect: The order does not advance.
  3. Enter Taylor as First Name, Tester as Last Name, and 90210 as Zip/Postal Code, then select Continue.
    - expect: The Checkout: Overview page is displayed with the Backpack and quantity 1.
    - expect: Payment and shipping information are shown, with Item total $29.99, Tax $2.40, and Total $32.39.
  4. Select Finish.
    - expect: The Checkout: Complete! page displays Thank you for your order!
    - expect: The cart indicator is empty and a Back Home control is available.

### 5. Sign Out

**Seed:** `tests/seed.spec.ts`

#### 5.1. Log out and verify protected inventory redirects to login

**File:** `tests/saucedemo/sign-out.spec.ts`

**Steps:**
  1. From a fresh app state, sign in with standard_user / secret_sauce.
    - expect: The inventory catalog is displayed.
  2. Open the navigation menu and select Logout.
    - expect: The login form is displayed at the site root.
  3. Navigate directly to https://www.saucedemo.com/inventory.html.
    - expect: The user is redirected to the login page and cannot view the inventory while signed out.
