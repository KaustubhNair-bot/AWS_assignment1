# Member 2 — Backend Developer (EC2 + Flask REST API)

## Your Role
You are responsible for building the **Flask REST API** that serves product data, and deploying it on an **Amazon EC2 instance**.

## What You Need to Build

### Files
| File                | Purpose                                    |
|---------------------|--------------------------------------------|
| `app.py`            | Flask application with REST endpoints      |
| `products.json`     | Product data (acts as our "database")      |
| `requirements.txt`  | Python dependencies                        |

### API Endpoints
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/products`       | Returns all products (JSON)  |
| GET    | `/api/products/<id>`  | Returns a single product     |
| GET    | `/health`             | Health check endpoint        |

### Configuration
Before deploying, update the image URLs in `products.json` to point to the **S3 images bucket**:
```json
"image": "https://YOUR-IMAGES-BUCKET.s3.amazonaws.com/product1.jpg"
```
You'll get the bucket URL from **Member 3**.

---

## AWS Setup Steps

### Step 1: Launch EC2 Instance
1. Go to **AWS Console → EC2 → Launch Instance**
2. **Name**: `product-catalog-api`
3. **AMI**: Amazon Linux 2023 (or Ubuntu 22.04)
4. **Instance type**: `t2.micro` (Free Tier eligible)
5. **Key pair**: Create new or use existing (download the `.pem` file!)
6. **Network settings**: 
   - Allow SSH from your IP
   - Allow HTTP from anywhere
   - Add custom TCP rule: port `5000`, source `0.0.0.0/0`
7. Click **Launch Instance**

### Step 2: Connect to EC2 via SSH
```bash
# Make key file read-only
chmod 400 your-key.pem

# Connect (replace with your EC2 public IP)
ssh -i your-key.pem ec2-user@YOUR-EC2-PUBLIC-IP

# For Ubuntu AMI, use: ssh -i your-key.pem ubuntu@YOUR-EC2-PUBLIC-IP
```

### Step 3: Install Dependencies on EC2
```bash
# Update system
sudo yum update -y                    # Amazon Linux
# OR: sudo apt update && sudo apt upgrade -y   # Ubuntu

# Install Python 3 and pip
sudo yum install python3 python3-pip -y       # Amazon Linux
# OR: sudo apt install python3 python3-pip -y  # Ubuntu

# Install Flask and flask-cors
pip3 install flask flask-cors
```

### Step 4: Upload Your Code to EC2
**Option A: Using SCP (from your local machine)**
```bash
# From YOUR local machine (not EC2), run:
scp -i your-key.pem app.py products.json requirements.txt ec2-user@YOUR-EC2-PUBLIC-IP:~/
```

**Option B: Using Git**
```bash
# On EC2:
sudo yum install git -y
git clone YOUR-REPO-URL
cd YOUR-REPO/member2-backend
```

**Option C: Copy-paste directly**
```bash
# On EC2, create the files manually:
nano app.py
# Paste the content, save with Ctrl+X, Y, Enter

nano products.json
# Paste the content, save

nano requirements.txt
# Paste the content, save
```

### Step 5: Run the Flask App
```bash
# Install requirements
pip3 install -r requirements.txt

# Run the app (accessible from outside)
python3 app.py
```

### Step 6: Test the API
Open in your browser:
- `http://YOUR-EC2-PUBLIC-IP:5000/health`
- `http://YOUR-EC2-PUBLIC-IP:5000/api/products`

### Step 7: Keep the App Running (optional but recommended)
```bash
# Use nohup to keep it running after closing SSH
nohup python3 app.py > flask.log 2>&1 &

# To check if it's still running:
ps aux | grep app.py

# To stop it:
kill $(pgrep -f "python3 app.py")
```

---

## Testing Locally
Before deploying to EC2, test locally:
```bash
cd member2-backend
pip install -r requirements.txt
python app.py
# Visit http://localhost:5000/api/products
```

---

## ⚠️ Important Notes
- Make sure port 5000 is open in your Security Group
- Never commit your `.pem` key file to Git
- Share your EC2 Public IP with Member 1 and Member 4
- Stop the EC2 instance when not in use to avoid charges
