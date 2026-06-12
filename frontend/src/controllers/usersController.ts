import { useState, useEffect, useCallback } from 'react';
import { User } from '../models/types';
import { UserService } from '../services/api';

export const useUsersController = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await UserService.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData: Partial<User>) => {
    try {
      const newUser = await UserService.create(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError('Failed to create user');
      throw err;
    }
  }, []);

  const updateUser = useCallback(async (id: number, userData: Partial<User>) => {
    try {
      const updated = await UserService.update(id, userData);
      setUsers(prev => prev.map(u => u.id === id ? updated : u));
      return updated;
    } catch (err) {
      setError('Failed to update user');
      throw err;
    }
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    try {
      await UserService.delete(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      setError('Failed to delete user');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, createUser, updateUser, deleteUser, refetch: fetchUsers };
};