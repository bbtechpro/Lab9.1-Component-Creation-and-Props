import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfileCard } from './UserProfileCard';
import type { User } from '../../types';
import { describe, it, expect, vi } from 'vitest';

describe('UserProfileCard Component', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Software Engineer',
    avatarUrl: 'https://example.com/avatar.jpg'
  };

  it('renders user name', () => {
    render(<UserProfileCard user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders email when showEmail is true', () => {
    render(<UserProfileCard user={mockUser} showEmail={true} />);
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('does not render email when showEmail is false', () => {
    render(<UserProfileCard user={mockUser} showEmail={false} />);
    expect(screen.queryByText('john.doe@example.com')).not.toBeInTheDocument();
  });

  it('renders role when showRole is true', () => {
    render(<UserProfileCard user={mockUser} showRole={true} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('does not render role when showRole is false', () => {
    render(<UserProfileCard user={mockUser} showRole={false} />);
    expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
  });

  it('renders avatar image when avatarUrl is provided', () => {
    render(<UserProfileCard user={mockUser} />);
    const image = screen.getByAltText('John Doe') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/avatar.jpg');
  });

  it('does not render image when avatarUrl is not provided', () => {
    const userWithoutAvatar: User = { ...mockUser, avatarUrl: undefined };
    render(<UserProfileCard user={userWithoutAvatar} />);
    expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument();
  });

  it('renders "Edit Profile" button when onEdit is provided', () => {
    render(<UserProfileCard user={mockUser} onEdit={() => {}} />);
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('does not render "Edit Profile" button when onEdit is not provided', () => {
    render(<UserProfileCard user={mockUser} />);
    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('calls onEdit with user id when button is clicked', () => {
    const handleEdit = vi.fn();
    render(<UserProfileCard user={mockUser} onEdit={handleEdit} />);
    const button = screen.getByText('Edit Profile');
    fireEvent.click(button);
    expect(handleEdit).toHaveBeenCalledWith('1');
  });

  it('renders children content', () => {
    render(
      <UserProfileCard user={mockUser}>
        <div>Additional user info</div>
      </UserProfileCard>
    );
    expect(screen.getByText('Additional user info')).toBeInTheDocument();
  });

  it('renders with minimal props (only required)', () => {
    render(<UserProfileCard user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('john.doe@example.com')).not.toBeInTheDocument();
    expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('renders with all props combined', () => {
    const handleEdit = vi.fn();
    render(
      <UserProfileCard
        user={mockUser}
        showEmail={true}
        showRole={true}
        onEdit={handleEdit}
      >
        <span>Status: Active</span>
      </UserProfileCard>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
  });

  it('renders different user data correctly', () => {
    const anotherUser: User = {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Product Manager'
    };
    render(<UserProfileCard user={anotherUser} showEmail={true} showRole={true} />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });
});
