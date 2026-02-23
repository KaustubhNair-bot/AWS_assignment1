# Member 3 — Image Storage + IAM/Security

## Your Role
You are responsible for setting up the **S3 bucket for product images**, configuring **CORS**, managing **IAM roles/permissions**, and ensuring **security** across all AWS services.

## What You Need to Do

### A. Set Up S3 Image Bucket
### B. Find and Upload Product Images  
### C. Configure Security (IAM, Bucket Policies, Security Groups)

---

## Detailed Steps

### Step 1: Create the S3 Images Bucket
1. Go to **AWS Console → S3 → Create Bucket**
2. Bucket name: `product-catalog-images-<your-team-name>`
3. Region: Same as your other resources (e.g., `ap-south-1`)
4. **Uncheck** "Block all public access" (images need to be publicly visible)
5. Acknowledge the warning
6. Click **Create Bucket**

### Step 2: Add Bucket Policy (Public Read)
1. Go to your bucket → **Permissions** tab
2. Click **Edit** under Bucket policy
3. Paste the policy from `bucket-policy.json` (replace the bucket name!)
4. Click **Save changes**

### Step 3: Configure CORS
1. In the **Permissions** tab, scroll to **Cross-origin resource sharing (CORS)**
2. Click **Edit**
3. Paste the CORS configuration from `cors-config.json`
4. Click **Save changes**

### Step 4: Find Product Images
You need **6 product images** matching the products in `products.json`:

| Filename        | Product                          |
|-----------------|----------------------------------|
| `product1.jpg`  | Wireless Noise-Cancelling Headphones |
| `product2.jpg`  | Smart Fitness Watch              |
| `product3.jpg`  | Classic Denim Jacket             |
| `product4.jpg`  | Leather Messenger Bag            |
| `product5.jpg`  | Minimalist Running Shoes         |
| `product6.jpg`  | Portable Bluetooth Speaker       |

**Where to find free images:**
- [Unsplash](https://unsplash.com) — Free high-quality photos
- [Pexels](https://pexels.com) — Free stock photos
- [Pixabay](https://pixabay.com) — Free images

**Tips:**
- Download images at a reasonably small size (600x600 or 800x800)
- Save them as `.jpg` for smaller file size
- Name them exactly: `product1.jpg`, `product2.jpg`, etc.

### Step 5: Upload Images to S3
1. Go to your bucket → **Objects** tab
2. Click **Upload**
3. Add all 6 images
4. Click **Upload**

### Step 6: Verify Images are Accessible
After uploading, each image should be accessible at:
```
https://YOUR-BUCKET-NAME.s3.amazonaws.com/product1.jpg
https://YOUR-BUCKET-NAME.s3.amazonaws.com/product2.jpg
... etc.
```
Open these URLs in your browser to verify they load.

### Step 7: Share Image URLs
Share the base URL with **Member 2** and **Member 4**:
```
https://YOUR-BUCKET-NAME.s3.amazonaws.com/
```

---

## Security Responsibilities

### IAM Best Practices
1. **Don't use root account** — Create IAM users for each team member
2. **Use least privilege** — Only give permissions that are needed
3. **Enable MFA** — If possible, enable multi-factor authentication

### Document Security Settings
Create a security summary for the team:
- [ ] S3 Frontend bucket: public read, static hosting
- [ ] S3 Images bucket: public read, CORS enabled
- [ ] EC2 Security Group: SSH (port 22, your IP only), HTTP (port 80), Flask (port 5000)
- [ ] IAM: Who has access to what

---

## Files in This Folder

| File              | What It Is                                    |
|-------------------|----------------------------------------------|
| `bucket-policy.json` | S3 bucket policy for public read access     |
| `cors-config.json`   | CORS configuration for the images bucket    |
| `sample-images/`     | Folder for product images before uploading  |

---

## ⚠️ Important Notes
- Make sure you use the **same AWS region** as other team members
- Share the image bucket URL with Member 2 (for `products.json`) ASAP
- Test image URLs in a private/incognito browser to confirm public access
- Take screenshots of all your AWS configurations
