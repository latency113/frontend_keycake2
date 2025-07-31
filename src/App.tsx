import OrderForm from './components/form/OrderForm';
import SidebarInfo from './components/layout/SidebarInfo';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <Header />
      <div className="container mx-auto mt-4 p-6 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0"> {/* Use min-w-0 for proper flex behavior */}
          <OrderForm />
        </div>
        <div className="lg:w-1/3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <SidebarInfo />
        </div>
      </div>
    </div>
  );
}

export default App;