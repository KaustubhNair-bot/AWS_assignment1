# ✅ Testing Checklist — Product Catalog

Use this checklist to verify the entire application is working correctly.

---

## 1. Backend API (EC2)

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 1.1 | Visit `http://EC2-IP:5000/health` | Returns JSON: `{"status": "healthy"}` | ⬜ |
| 1.2 | Visit `http://EC2-IP:5000/api/products` | Returns JSON array of 6 products | ⬜ |
| 1.3 | Visit `http://EC2-IP:5000/api/products/1` | Returns single product with id=1 | ⬜ |
| 1.4 | Visit `http://EC2-IP:5000/api/products/999` | Returns 404 error | ⬜ |
| 1.5 | Visit `http://EC2-IP:5000/api/products?category=Electronics` | Returns only Electronics products | ⬜ |
| 1.6 | Visit `http://EC2-IP:5000/` | Returns API info JSON | ⬜ |

---

## 2. S3 Image Bucket

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 2.1 | Open `https://IMAGES-BUCKET.s3.amazonaws.com/product1.jpg` | Image loads in browser | ⬜ |
| 2.2 | Open `https://IMAGES-BUCKET.s3.amazonaws.com/product2.jpg` | Image loads in browser | ⬜ |
| 2.3 | Open `https://IMAGES-BUCKET.s3.amazonaws.com/product3.jpg` | Image loads in browser | ⬜ |
| 2.4 | Open `https://IMAGES-BUCKET.s3.amazonaws.com/product4.jpg` | Image loads in browser | ⬜ |
| 2.5 | Open `https://IMAGES-BUCKET.s3.amazonaws.com/product5.jpg` | Image loads in browser | ⬜ |
| 2.6 | Open `https://IMAGES-BUCKET.s3.amazonaws.com/product6.jpg` | Image loads in browser | ⬜ |
| 2.7 | Open image URL in incognito/private window | Image still loads (confirms public access) | ⬜ |

---

## 3. S3 Frontend (Static Website)

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 3.1 | Open S3 website URL | Page loads with header and hero section | ⬜ |
| 3.2 | Check page title | Shows "ShopVista — Premium Product Catalog" | ⬜ |
| 3.3 | Wait for products to load | Product cards appear in grid | ⬜ |
| 3.4 | Count products | 6 product cards visible | ⬜ |
| 3.5 | Check product images | All 6 images load correctly | ⬜ |
| 3.6 | Check product details | Each card shows name, price, description, category | ⬜ |

---

## 4. Frontend Features

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 4.1 | Click "Electronics" nav link | Only Electronics products shown | ⬜ |
| 4.2 | Click "Clothing" nav link | Only Clothing products shown | ⬜ |
| 4.3 | Click "Accessories" nav link | Only Accessories products shown | ⬜ |
| 4.4 | Click "All Products" nav link | All products shown again | ⬜ |
| 4.5 | Type "headphones" in search | Only headphones product shown | ⬜ |
| 4.6 | Clear search box | All products shown again | ⬜ |
| 4.7 | Type a non-existent product | "No products found" message appears | ⬜ |
| 4.8 | Click "View Details" on a card | Alert shows product details | ⬜ |
| 4.9 | Hover over a product card | Card lifts up with glow effect | ⬜ |

---

## 5. Error Handling

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 5.1 | Stop the Flask API, reload frontend | Error message with retry button appears | ⬜ |
| 5.2 | Click "Retry" button | Shows loading, then error again (API still down) | ⬜ |
| 5.3 | Restart Flask API, click "Retry" | Products load successfully | ⬜ |
| 5.4 | Delete an image from S3, reload page | Placeholder icon (📷) shown for missing image | ⬜ |

---

## 6. Responsive Design

| # | Test Case | Expected Result | Pass? |
|---|-----------|-----------------|-------|
| 6.1 | View on desktop (>1024px) | 3-4 column grid layout | ⬜ |
| 6.2 | View on tablet (768px) | 2-3 column grid layout | ⬜ |
| 6.3 | View on mobile (480px) | 1 column layout, no horizontal scroll | ⬜ |
| 6.4 | Navigation on mobile | Nav links wrap properly | ⬜ |

---

## 7. Cross-Browser

| # | Browser | Works? |
|---|---------|--------|
| 7.1 | Google Chrome | ⬜ |
| 7.2 | Mozilla Firefox | ⬜ |
| 7.3 | Microsoft Edge | ⬜ |
| 7.4 | Safari | ⬜ |

---

## 8. Security Check

| # | Check | Status |
|---|-------|--------|
| 8.1 | S3 frontend bucket: only allows `GetObject` | ⬜ |
| 8.2 | S3 images bucket: only allows `GetObject` | ⬜ |
| 8.3 | EC2 Security Group: SSH restricted to team IPs | ⬜ |
| 8.4 | No AWS credentials in code | ⬜ |
| 8.5 | No `.pem` files committed to Git | ⬜ |

---

## Test Summary

| Area | Total | Passed | Failed |
|------|-------|--------|--------|
| Backend API | 6 | | |
| S3 Images | 7 | | |
| S3 Frontend | 6 | | |
| Features | 9 | | |
| Error Handling | 4 | | |
| Responsive | 4 | | |
| Cross-Browser | 4 | | |
| Security | 5 | | |
| **TOTAL** | **45** | | |

---

**Tested by:** ________________  
**Date:** ________________  
**Overall Status:** ⬜ PASS / ⬜ FAIL
