
import './App.css'
import { AlertBox } from './components/AlertBox/AlertBox';
import { UserProfileCard } from './components/UserProfileCard/UserProfileCard';
import { ProductDisplay } from './components/ProductDisplay/ProductDisplay';
import type { User, Product } from './types/index';

// Sample data for demonstration
const sampleUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Software Engineer',
  avatarUrl: 'https://example.com/avatar.jpg'
};

const sampleProduct: Product = {
  id: '1',
  name: 'Wireless Headphones',
  price: 199.99,
  description: 'High-quality wireless headphones with noise cancellation.',
  imageUrl: './src/assets/headphones.jpg',
  inStock: true
};

function App() {
  const handleAlertClose = () => {
    alert('Alert closed');
  };

  const handleUserEdit = (userId: string) => {
    alert(`Editing user ${userId}`);
  };

  const handleAddToCart = (productId: string) => {
    alert(`Added product ${productId} to cart`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold mb-4">Component Library Demo</h1>
        <p className="text-lg text-gray-600 mb-8">
          A showcase of reusable React components with TypeScript.
        </p>
      </header>
    
      <div className="components-container p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Alert Box Component</h2>
          <AlertBox
            type="success"
            message="Your profile has been updated successfully!"
            onClose={handleAlertClose}
          >
            <p className="text-sm">You can now continue using the application.</p>
          </AlertBox>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Profile Card Component</h2>
          <UserProfileCard
            user={sampleUser}
            showEmail={true}
            showRole={true}
            onEdit={handleUserEdit}
          >
            <div className="text-sm text-gray-500 mt-2">
              Last login: 2 hours ago
            </div>
          </UserProfileCard>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Product Display Component</h2>
          <ProductDisplay
            product={sampleProduct}
            showDescription={true}
            showStockStatus={true}
            onAddToCart={handleAddToCart}
          >
            <div className="text-sm text-gray-500 mt-2">
              Free shipping available
            </div>
          </ProductDisplay>
        </section>
      </div>
    </div>
  );
}

export default App;
