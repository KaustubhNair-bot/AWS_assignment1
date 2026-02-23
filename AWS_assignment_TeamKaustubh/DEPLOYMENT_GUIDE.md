# 🚀 Deployment Guide — Product Catalog

> Step-by-step guide to deploy the entire Product Catalog application on AWS.

---

## Prerequisites
- An **AWS account** (Free Tier eligible)
- A **terminal** (Mac/Linux) or **PuTTY** (Windows) for SSH
- **Python 3** installed locally for testing

---

## Step 1: Set Up S3 Image Bucket (Member 3)

### 1.1 Create the Bucket
1. Go to **AWS Console → S3 → Create Bucket**
2. Name: `product-catalog-images-<team-name>`
3. Region: Choose your preferred region
4. **Uncheck** "Block all public access"
5. Create the bucket

### 1.2 Configure Bucket Policy
Go to **Permissions → Bucket Policy** and paste:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadImages",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-IMAGES-BUCKET-NAME/*"
        }
    ]
}
```

### 1.3 Configure CORS
Go to **Permissions → CORS** and paste:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

### 1.4 Upload Product Images
Upload `product1.jpg` through `product6.jpg` to the bucket.

### 1.5 Verify
Test URL: `https://YOUR-BUCKET.s3.amazonaws.com/product1.jpg`

📝 **Note down the bucket URL:** `https://YOUR-IMAGES-BUCKET.s3.amazonaws.com/`

---

## Step 2: Set Up EC2 and Deploy Backend (Member 2)

### 2.1 Launch EC2 Instance
1. Go to **EC2 → Launch Instance**
2. Name: `product-catalog-api`
3. AMI: Amazon Linux 2023
4. Type: `t2.micro`
5. Key pair: Create new → Download `.pem`
6. Security Group Rules:
   - SSH (22) → My IP
   - HTTP (80) → 0.0.0.0/0
   - Custom TCP (5000) → 0.0.0.0/0

### 2.2 Connect and Install
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ec2-user@EC2-PUBLIC-IP

# On EC2:
sudo yum update -y
sudo yum install python3 python3-pip -y
pip3 install flask flask-cors
```

### 2.3 Upload and Update Code
```bash
# Upload files via SCP (from local):
scp -i your-key.pem app.py products.json requirements.txt ec2-user@EC2-IP:~/
```

**Update `products.json`** — Replace all image URLs with the actual S3 bucket URL from Step 1.

### 2.4 Run the API
```bash
# Run in background:
nohup python3 app.py > flask.log 2>&1 &
```

### 2.5 Verify
Test: `http://EC2-PUBLIC-IP:5000/api/products`

📝 **Note down the EC2 IP:** `http://YOUR-EC2-IP:5000`

---

## Step 3: Set Up S3 Frontend Hosting (Member 1)

### 3.1 Create the Frontend Bucket
1. Go to **S3 → Create Bucket**
2. Name: `product-catalog-frontend-<team-name>`
3. **Uncheck** "Block all public access"

### 3.2 Enable Static Website Hosting
Go to **Properties → Static website hosting → Enable**
- Index document: `index.html`

### 3.3 Add Bucket Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-FRONTEND-BUCKET/*"
        }
    ]
}
```

### 3.4 Update and Upload Frontend
**Update `script.js`** — Set the correct API URL:
```javascript
const API_BASE_URL = 'http://YOUR-EC2-IP:5000';
```

Upload: `index.html`, `style.css`, `script.js`

### 3.5 Verify
Open the S3 website URL: `http://YOUR-FRONTEND-BUCKET.s3-website-REGION.amazonaws.com`

---

## Step 4: Final Verification (Member 4)

### Complete Flow Test
1. ✅ Open the S3 frontend URL
2. ✅ Products should load automatically
3. ✅ Product images should display from S3 images bucket
4. ✅ Search and filter should work
5. ✅ Test on different browsers
6. ✅ Test on mobile

### Common Issues

| Problem | Solution |
|---------|----------|
| CORS error in console | Check CORS config on images bucket |
| Products not loading | Verify EC2 Security Group has port 5000 open |
| Images not showing | Check image bucket policy and file names |
| 403 Forbidden on S3 | Ensure bucket policy allows public read |
| Can't SSH to EC2 | Check Security Group SSH rule and key file permissions |

---

## 🧹 Cleanup (After Assignment)
**To avoid AWS charges, clean up:**
1. **EC2**: Stop or terminate the instance
2. **S3 Frontend**: Empty and delete the bucket
3. **S3 Images**: Empty and delete the bucket
