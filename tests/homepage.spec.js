const { test, expect } = require('@playwright/test')

test.describe('Homepage and Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8001')
  })

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog by Dan Siwiec/)

    const heading = page.locator('h1, h2, .site-title')
    await expect(heading.first()).toBeVisible()
  })

  test('navigate to About page', async ({ page }) => {
    const aboutLink = page.locator('a[href="/about/"]')
    await expect(aboutLink).toBeVisible()
    await aboutLink.click()

    await expect(page).toHaveURL(/.*\/about/)
    await expect(page.locator('body')).toContainText('About')
  })

  test('verify navigation menu elements', async ({ page }) => {
    const lifeTrigger = page.locator('.menu__list-item-link.like-anchor', { hasText: 'Life' })
    await expect(lifeTrigger).toBeVisible()

    const softwareTrigger = page.locator('.menu__list-item-link.like-anchor', { hasText: 'Software' })
    await expect(softwareTrigger).toBeVisible()

    const aboutLink = page.locator('a[href="/about/"]')
    await expect(aboutLink).toBeVisible()
  })

  test('expand and check Life submenu', async ({ page }) => {
    const lifeTrigger = page.locator('.menu__list-item-link.like-anchor', { hasText: 'Life' })
    await lifeTrigger.click()

    await page.waitForTimeout(500)

    const adventuresLink = page.locator('a[href="/life/adventures/"]')
    await expect(adventuresLink).toBeVisible()

    const sportsLink = page.locator('a[href="/life/sports/"]')
    await expect(sportsLink).toBeVisible()
  })

  test('expand and check Software submenu', async ({ page }) => {
    const softwareTrigger = page.locator('.menu__list-item-link.like-anchor', { hasText: 'Software' })
    await softwareTrigger.click()

    await page.waitForTimeout(500)

    const portfolioLink = page.locator('a[href="/software/portfolio/"]')
    await expect(portfolioLink).toBeVisible()
  })

  test('check responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()

    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(page.locator('body')).toBeVisible()
  })

  test('check for basic SEO elements', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveCount(1)
    await expect(page).toHaveTitle(/.+/)
  })
})
