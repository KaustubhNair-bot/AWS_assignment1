"""
ShopVista — Product Catalog REST API
=====================================
A simple Flask REST API that serves product catalog data.
Deployed on Amazon EC2.

"""

import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

# ── App Setup ──────────────────────────────────
app = Flask(__name__)

# Enable CORS for all routes (so the S3 frontend can call this API)
CORS(app)

# ── Load Product Data ──────────────────────────
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'products.json')


def load_products():
    """Load products from the JSON file."""
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"⚠️  Warning: {DATA_FILE} not found. Using empty product list.")
        return []
    except json.JSONDecodeError:
        print(f"⚠️  Warning: {DATA_FILE} contains invalid JSON.")
        return []


# ── API Routes ─────────────────────────────────

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running."""
    return jsonify({
        'status': 'healthy',
        'service': 'ShopVista Product API',
        'version': '1.0.0'
    })


@app.route('/api/products', methods=['GET'])
def get_all_products():
    """
    Get all products.
    
    Optional query parameter:
        ?category=Electronics  → Filter by category
    
    Returns:
        JSON array of product objects
    """
    products = load_products()

    # Optional: Filter by category
    category = request.args.get('category')
    if category:
        products = [p for p in products if p.get('category', '').lower() == category.lower()]

    return jsonify(products)


@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    """
    Get a single product by its ID.
    
    Args:
        product_id: The product's unique ID
    
    Returns:
        JSON object of the product, or 404 error
    """
    products = load_products()

    product = next((p for p in products if p['id'] == product_id), None)

    if product is None:
        return jsonify({
            'error': 'Product not found',
            'message': f'No product with ID {product_id} exists.'
        }), 404

    return jsonify(product)


@app.route('/', methods=['GET'])
def index():
    """Root endpoint — provides API information."""
    return jsonify({
        'name': 'ShopVista Product Catalog API',
        'version': '1.0.0',
        'endpoints': {
            'GET /api/products': 'List all products',
            'GET /api/products/<id>': 'Get product by ID',
            'GET /api/products?category=<name>': 'Filter by category',
            'GET /health': 'Health check'
        }
    })


# ── Run Server ─────────────────────────────────
if __name__ == '__main__':
    print("🚀 ShopVista Product API starting...")
    print("📍 Endpoints:")
    print("   GET  /api/products")
    print("   GET  /api/products/<id>")
    print("   GET  /health")
    print()

    # host='0.0.0.0' makes it accessible from outside (needed for EC2)
    # debug=True enables auto-reload during development
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
