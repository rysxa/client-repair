import { LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export const Header = () => {
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  // const accessToken = auth?.accessToken;
  // console.log("Authentication State:", authSlice);

  const handleLogout = async () => {
    try {
      // Check if auth exists and has signOut method
      if (!auth?.signOut) {
        console.error('Auth is not properly initialized');
        // Hapus token dari localStorage
        localStorage.removeItem('accessToken');
        const token = localStorage.getItem('accessToken');
        console.log(token);
        
        // Arahkan pengguna ke halaman login
        navigate('/login');
        return;
      }
      
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="px-4 py-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Toas Repair
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                {user?.username || 'Guest'}
              </span>
              <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">
                {user?.role || 'User'}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
