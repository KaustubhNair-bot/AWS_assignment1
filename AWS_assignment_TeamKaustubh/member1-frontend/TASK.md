# Member 1 — Frontend Developer

## Your Role
You are responsible for building the **product catalog frontend** (HTML, CSS, JavaScript) and hosting it as a **static website on Amazon S3**.

## What You Need to Build

### Files
| File         | Purpose                                    |
|--------------|--------------------------------------------|
| `index.html` | Main page structure                        |
| `style.css`  | All styling (responsive, modern design)    |
| `script.js`  | Fetches data from API, renders products    |

### How It Works
1. User visits the S3 website URL
2. Browser loads `index.html` (which links `style.css` and `script.js`)
3. `script.js` makes a `fetch()` call to the Flask API on EC2
4. API returns JSON product data
5. `script.js` renders product cards with images from the Images S3 bucket

### Configuration
Before deploying, update the API URL in `script.js`:
```javascript
const API_BASE_URL = 'http://YOUR-EC2-PUBLIC-IP:5000';
```
You'll get this IP from **Member 2** after they deploy the API.

---

## AWS Setup Steps

### Step 1: Create S3 Bucket
1. Go to **AWS Console → S3 → Create Bucket**
2. Bucket name: `product-catalog-frontend-<your-team-name>`
3. Region: Choose one close to you (e.g., `ap-south-1` for India)
4. **Uncheck** "Block all public access" → Confirm
5. Click **Create Bucket**

### Step 2: Enable Static Website Hosting
1. Click on your bucket → **Properties** tab
2. Scroll to **Static website hosting** → Click **Edit**
3. Select **Enable**
4. Index document: `index.html`
5. Click **Save changes**

### Step 3: Add Bucket Policy
1. Click on your bucket → **Permissions** tab
2. Scroll to **Bucket policy** → Click **Edit**
3. Paste this policy (replace `YOUR-BUCKET-NAME`):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```
4. Click **Save changes**

### Step 4: Upload Files
1. Click on your bucket → **Objects** tab
2. Click **Upload**
3. Add files: `index.html`, `style.css`, `script.js`
4. Click **Upload**

### Step 5: Test
1. Go to **Properties** → **Static website hosting**
2. Copy the **Bucket website endpoint** URL
3. Open it in your browser — your site should load!

---

## Testing Locally
Before deploying to S3, test locally:
```bash
cd member1-frontend
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

Note: For local testing, you'll need the backend running too (Member 2's code).
