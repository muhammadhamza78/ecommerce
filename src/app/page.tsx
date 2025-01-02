"use client"
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

// Sample data - replace this with Sanity data later
const dummyProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    stock: 10,
    image: '/api/placeholder/400/300'
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 79.99,
    description: 'Comfortable running shoes for all terrains',
    category: 'Sports',
    stock: 15,
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    price: 129.99,
    description: 'Programmable coffee maker with built-in grinder',
    category: 'Home',
    stock: 5,
    image: '/api/placeholder/400/300'
  }
];

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="relative w-full h-48 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <Badge variant="secondary">{product.category}</Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
        {product.stock === 0 && (
          <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewDetails(product)}
        >
          Details
        </Button>
        <Button 
          className="flex-1"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductDetails = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{product.name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-64 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.stock > 0 ? (
                <Badge variant="outline">{product.stock} in stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-bold">${product.price}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            disabled={product.stock === 0}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const Cart = ({ items, products, onUpdateQuantity }) => {
  const getTotalPrice = () => {
    return Object.entries(items).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product.price * quantity);
    }, 0);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Shopping Cart
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(items).length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(items).map(([productId, quantity]) => {
              const product = products.find(p => p.id === productId);
              return (
                <div key={productId} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      ${product.price} × {quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onUpdateQuantity(productId, quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onUpdateQuantity(productId, quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <p className="font-bold">Total:</p>
                <p className="font-bold">${getTotalPrice().toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {Object.keys(items).length > 0 && (
        <CardFooter>
          <Button className="w-full">Proceed to Checkout</Button>
        </CardFooter>
      )}
    </Card>
  );
};

const EcommerceApp = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    setCart(prev => {
      const updated = { ...prev };
      if (newQuantity <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQuantity;
      }
      return updated;
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onViewDetails={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Cart
        items={cart}
        products={products}
        onUpdateQuantity={handleUpdateCartQuantity}
      />
    </div>
  );
};

export default EcommerceApp;