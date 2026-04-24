import type { UserProfileCardProps } from '../../types';

/**
 * UserProfileCard Component
 * 
 * A reusable component for displaying user profile information.
 * 
 * @param user - The user object containing id, name, email, role, and optional avatarUrl
 * @param showEmail - Whether to display the user's email (optional)
 * @param showRole - Whether to display the user's role (optional)
 * @param onEdit - Callback function when "Edit Profile" button is clicked (optional)
 * @param children - Additional content to render within the component (optional)
 */
export const UserProfileCard = ({
  user,
  showEmail,
  showRole,
  onEdit,
  children
}: UserProfileCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center space-x-4">
        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          {showEmail && <p className="text-gray-600">{user.email}</p>}
          {showRole && <p className="text-blue-500 font-semibold">{user.role}</p>}
        </div>
      </div>
      {children}
      {onEdit && (
        <button
          onClick={() => onEdit(user.id)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};