# Frontend Code Conventions & Best Practices

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [Code Style Guidelines](#code-style-guidelines)
- [TypeScript Best Practices](#typescript-best-practices)
- [Component Development](#component-development)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Form Handling](#form-handling)
- [Styling Guidelines](#styling-guidelines)
- [Performance Optimization](#performance-optimization)
- [Error Handling](#error-handling)
- [Security Best Practices](#security-best-practices)
- [Testing Guidelines](#testing-guidelines)
- [Accessibility](#accessibility)
- [Internationalization](#internationalization)
- [Development Workflow](#development-workflow)

## Overview

This document establishes coding standards and best practices for our Next.js application. These conventions ensure code consistency, maintainability, scalability, and provide a smooth onboarding experience for new team members.

### Core Principles

- **Consistency**: Uniform code patterns across the entire codebase
- **Readability**: Self-documenting code that's easy to understand
- **Maintainability**: Code that's easy to modify and extend
- **Performance**: Optimized for speed and efficiency
- **Security**: Following security best practices
- **Accessibility**: Inclusive design for all users

## Project Structure

### Recommended Directory Structure

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (dashboard)/       # Route groups
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── feature/         # Feature-specific components
├── lib/                 # Utility libraries
│   ├── utils.ts         # General utilities
│   ├── validations.ts   # Validation schemas
│   └── constants.ts     # Application constants
├── hooks/               # Custom React hooks
├── services/            # Business logic & API services
├── types/               # TypeScript type definitions
│   ├── api.ts          # API response types
│   ├── common.ts       # Common types
│   └── [feature].ts    # Feature-specific types
├── store/               # State management
├── styles/              # Global styles and themes
└── assets/              # Static assets
```

### File Organization Principles

1. **Feature-based grouping**: Related files should be co-located
2. **Separation of concerns**: Separate business logic from UI components
3. **Consistent depth**: Avoid deeply nested directories (max 3-4 levels)
4. **Clear boundaries**: Distinct separation between shared and feature-specific code

## Naming Conventions

### File and Directory Naming

```typescript
// Components: PascalCase
UserProfile.tsx;
NavigationMenu.tsx;
DataTable.tsx;

// Pages: kebab-case (App Router)
app / user - profile / page.tsx;
app / admin / user - management / page.tsx;

// API routes: kebab-case
app / api / auth / login / route.ts;
app / api / users / [id] / route.ts;

// Hooks: camelCase with 'use' prefix
useUserData.ts;
useLocalStorage.ts;
useDebounce.ts;

// Utilities: camelCase
formatDate.ts;
apiClient.ts;
validationHelpers.ts;

// Types: PascalCase
UserTypes.ts;
ApiTypes.ts;
CommonTypes.ts;

// Constants: SCREAMING_SNAKE_CASE for files
API_CONSTANTS.ts;
APP_CONFIG.ts;
```

### Variable and Function Naming

```typescript
// Variables: camelCase
const userName = "john_doe";
const isLoading = false;
const userPreferences = {};

// Functions: camelCase with descriptive verbs
const getUserById = (id: string) => {};
const validateEmail = (email: string) => {};
const handleSubmit = () => {};

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;

// Boolean variables: use is/has/can/should prefixes
const isAuthenticated = true;
const hasPermission = false;
const canEdit = true;
const shouldValidate = false;

// Event handlers: handle + Action
const handleClick = () => {};
const handleSubmit = () => {};
const handleInputChange = () => {};
```

### Component Naming

```typescript
// Component names: PascalCase, descriptive
const UserProfileCard = () => {};
const NavigationSidebar = () => {};
const ProductSearchForm = () => {};

// Props types: ComponentName + Props
type UserProfileCardProps = {
  user: User;
  onEdit: () => void;
};

// Custom hooks: use + Description
const useUserAuthentication = () => {};
const useApiQuery = () => {};
const useFormValidation = () => {};
```

## Code Style Guidelines

### Import Organization

```typescript
// 1. React and Next.js imports
import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router;
// 2. Third-party libraries (alphabetical)
import { Button, Input, Modal } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { ApiResponse, User } from "@/types/common";
// 3. Internal imports (services, types, utils)
import { apiClient } from "@/lib/api-client";
import { validateEmail } from "@/lib/utils";

// 4. Relative imports
import { UserCard } from "./UserCard";

import "./styles.css";
```

### Function Declaration Styles

```typescript
// Prefer arrow functions for components
const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return <div>{user.name}</div>;
};

// Use function declarations for hoisted utilities
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Use arrow functions for event handlers
const handleSubmit = useCallback(async (data: FormData) => {
  try {
    await submitForm(data);
  } catch (error) {
    console.error('Submission failed:', error);
  }
}, []);
```

### Code Organization Within Components

```typescript
const UserManagement: React.FC = () => {
  // 1. Hooks (useState, useEffect, custom hooks)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { data, error } = useQuery(['users'], fetchUsers);

  // 2. Computed values
  const filteredUsers = useMemo(() =>
    users.filter(user => user.active), [users]
  );

  // 3. Event handlers
  const handleUserSelect = useCallback((userId: string) => {
    // Handle selection
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    // Handle form submission
  }, []);

  // 4. Effects
  useEffect(() => {
    fetchUsers();
  }, []);

  // 5. Early returns
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  // 6. Render
  return (
    <div>
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} onSelect={handleUserSelect} />
      ))}
    </div>
  );
};
```

## TypeScript Best Practices

### Type Definitions

```typescript
// Use type aliases for object shapes
type User = {
  readonly id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
};

// Use type aliases for unions and primitives
type Status = "loading" | "success" | "error";
type UserId = string;

// Use enums for known constants
enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

// Generic types for reusable patterns
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
};

type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
```

### Advanced TypeScript Patterns

```typescript
// Utility types for form handling
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

// Conditional types
type ApiEndpoint<T> = T extends "users"
  ? "/api/users"
  : T extends "posts"
    ? "/api/posts"
    : never;

// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;

// Branded types for type safety
type Email = string & { readonly brand: unique symbol };
type UserId = string & { readonly brand: unique symbol };
```

### Type Guards and Validation

```typescript
// Type guards
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj
  );
}

// Runtime validation with Zod
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});

type User = z.infer<typeof UserSchema>;
```

### Why We Prefer Type Over Interface

1. **Consistency**: Types provide a unified syntax for all type definitions
2. **Flexibility**: Types support unions, intersections, and computed properties more naturally
3. **Composability**: Better support for complex type operations and transformations
4. **Performance**: Slightly better TypeScript compiler performance in some cases

```typescript
// Preferred: Type aliases
type BaseProps = {
  id: string;
  className?: string;
};

type ButtonProps = BaseProps & {
  variant: "primary" | "secondary";
  onClick: () => void;
};

// Avoid: Interfaces (except for extending library types)
interface LibraryComponentProps {
  // Only use interfaces when extending from library types
  // or when declaration merging is specifically needed
}
```

## Component Development

### Component Structure Template

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Props type
type ComponentNameProps = {
  // Required props first
  title: string;
  onAction: (id: string) => void;

  // Optional props
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;

  // Event handlers
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
}

// Component implementation
export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onAction,
  className,
  disabled = false,
  children,
  onClick,
  onSubmit,
}) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Event handlers
  const handleClick = useCallback(() => {
    if (disabled || isLoading) return;
    onClick?.();
  }, [disabled, isLoading, onClick]);

  const handleSubmit = useCallback(async (data: FormData) => {
    if (disabled) return;

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [disabled, onSubmit]);

  // Effects
  useEffect(() => {
    // Component initialization
  }, []);

  // Early returns for loading/error states
  if (error) {
    return <div className="error-state">{error}</div>;
  }

  // Main render
  return (
    <div className={cn('component-base-styles', className)}>
      <h2>{title}</h2>
      {children}
      <button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={cn(
          'button-base-styles',
          disabled && 'button-disabled',
          isLoading && 'button-loading'
        )}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};

// Default export
export default ComponentName;
```

### Component Composition Patterns

```typescript
// Compound component pattern
const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};

// Usage
<Modal.Root>
  <Modal.Trigger>Open Modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Content</Modal.Body>
    <Modal.Footer>Actions</Modal.Footer>
  </Modal.Content>
</Modal.Root>

// Render props pattern
type RenderPropsComponentProps<T> = {
  data: T[];
  children: (props: {
    items: T[];
    loading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

const DataProvider = <T,>({ data, children }: RenderPropsComponentProps<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return children({ items: data, loading, error });
};
```

## State Management

### Local State Management

```typescript
// useState for simple state
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);

// useReducer for complex state
type State = {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUserId: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: User[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SELECT_USER"; payload: string };

const initialState: State = {
  users: [],
  loading: false,
  error: null,
  selectedUserId: null,
};

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SELECT_USER":
      return { ...state, selectedUserId: action.payload };
    default:
      return state;
  }
}

const useUserState = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const users = await apiClient.getUsers();
      dispatch({ type: "FETCH_SUCCESS", payload: users });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  return { state, dispatch, fetchUsers };
};
```

### Global State with Context

```typescript
// Context setup
type AppContextType = {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const value = useMemo(() => ({
    user,
    theme,
    setUser,
    setTheme,
  }), [user, theme]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
```

### Redux Toolkit (when needed)

```typescript
// Slice definition
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentUser, clearError } = userSlice.actions;
export default userSlice.reducer;
```

## API Integration

### API Client Setup

```typescript
// API client configuration
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);
```

### Service Layer Pattern

```typescript
// Service type
type UserService = {
  getUsers(params?: GetUsersParams): Promise<PaginatedResponse<User>>;
  getUserById(id: string): Promise<User>;
  createUser(data: CreateUserData): Promise<User>;
  updateUser(id: string, data: UpdateUserData): Promise<User>;
  deleteUser(id: string): Promise<void>;
};

// Service implementation
class UserServiceImpl implements UserService {
  async getUsers(
    params: GetUsersParams = {}
  ): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams({
      page: params.page?.toString() ?? "1",
      limit: params.limit?.toString() ?? "10",
      ...(params.search && { search: params.search }),
      ...(params.role && { role: params.role }),
    });

    return apiClient.get<PaginatedResponse<User>>(`/users?${queryParams}`);
  }

  async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserData): Promise<User> {
    return apiClient.post<User>("/users", data);
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserServiceImpl();
```

### React Query Integration

```typescript
// Query hooks
export const useUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUser = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id),
    enabled,
  });
};

// Mutation hooks
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: (newUser) => {
      // Update users list cache
      queryClient.setQueryData(
        ["users"],
        (old: PaginatedResponse<User> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: [newUser, ...old.data],
          };
        }
      );

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      userService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Update specific user cache
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);

      // Update users list cache
      queryClient.setQueryData(
        ["users"],
        (old: PaginatedResponse<User> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            ),
          };
        }
      );
    },
  });
};
```

## Form Handling

### Form Validation with Zod

```typescript
// Validation schema
const createUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .max(100, "Email must be less than 100 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase, one uppercase, and one number"
      ),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Terms and conditions must be accepted",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type CreateUserFormData = z.infer<typeof createUserSchema>;
```

### Custom Form Hook

```typescript
type UseFormOptions<T> = {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
};

type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>(() =>
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key],
        error: undefined,
        touched: false,
      };
      return acc;
    }, {} as FormState<T>)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        touched: true,
      },
    }));
  }, []);

  const setError = useCallback(<K extends keyof T>(field: K, error: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error,
      },
    }));
  }, []);

  const validate = useCallback(() => {
    if (!validationSchema) return true;

    const values = Object.keys(formState).reduce((acc, key) => {
      acc[key as keyof T] = formState[key as keyof T].value;
      return acc;
    }, {} as T);

    const result = validationSchema.safeParse(values);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof T;
        setError(field, error.message);
      });
      return false;
    }

    // Clear errors if validation passes
    Object.keys(formState).forEach((key) => {
      setFormState((prev) => ({
        ...prev,
        [key]: {
          ...prev[key as keyof T],
          error: undefined,
        },
      }));
    });

    return true;
  }, [formState, validationSchema, setError]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        const values = Object.keys(formState).reduce((acc, key) => {
          acc[key as keyof T] = formState[key as keyof T].value;
          return acc;
        }, {} as T);

        await onSubmit(values);
      } catch (error) {
        console.error("Form submission failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validate, onSubmit]
  );

  const reset = useCallback(() => {
    setFormState(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = {
          value: initialValues[key],
          error: undefined,
          touched: false,
        };
        return acc;
      }, {} as FormState<T>)
    );
  }, [initialValues]);

  const getFieldProps = useCallback(
    <K extends keyof T>(field: K) => ({
      value: formState[field].value,
      error: formState[field].error,
      onChange: (value: T[K]) => setValue(field, value),
      onBlur: () => {
        setFormState((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            touched: true,
          },
        }));
      },
    }),
    [formState, setValue]
  );

  return {
    formState,
    setValue,
    setError,
    validate,
    handleSubmit,
    reset,
    getFieldProps,
    isSubmitting,
    values: Object.keys(formState).reduce((acc, key) => {
      acc[key as keyof T] = formState[key as keyof T].value;
      return acc;
    }, {} as T),
  };
}
```

## Styling Guidelines

### CSS Architecture

```css
/* Base styles */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Typography */
  --font-family-sans: "Inter", sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;

  /* Borders */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Component styles using BEM methodology */
.button {
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &--primary {
    background-color: var(--color-primary);
    color: white;

    &:hover {
      background-color: color-mix(in srgb, var(--color-primary) 90%, black);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    color: white;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### Tailwind CSS Best Practices

```typescript
// Use utility classes effectively
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Variant styles
        {
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500':
            variant === 'primary',
          'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500':
            variant === 'secondary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500':
            variant === 'outline',
        },

        // Size styles
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },

        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Image Optimization

```typescript
import Image from 'next/image';
import { useState } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
```

## Error Handling

### Error Boundaries

```typescript
import React, { ErrorInfo } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{
  error?: Error;
  resetError: () => void
}> = ({ error, resetError }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
    <h2 className="text-2xl font-bold text-red-600 mb-4">
      Something went wrong
    </h2>
    <p className="text-gray-600 mb-4 text-center">
      {error?.message || 'An unexpected error occurred'}
    </p>
    <button
      onClick={resetError}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Try again
    </button>
  </div>
);
```

### API Error Handling

```typescript
// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public errors: Record<string, string[]>
  ) {
    super(message, 422, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

// Enhanced API client with error handling
class ApiClient {
  private handleError(error: any): never {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          throw new ApiError(data.message || "Bad Request", status, data.code);
        case 401:
          throw new ApiError("Unauthorized", status, "UNAUTHORIZED");
        case 403:
          throw new ApiError("Forbidden", status, "FORBIDDEN");
        case 404:
          throw new ApiError("Not Found", status, "NOT_FOUND");
        case 422:
          throw new ValidationError("Validation Error", data.errors || {});
        case 429:
          throw new ApiError("Too Many Requests", status, "RATE_LIMITED");
        default:
          throw new ApiError(data.message || "Server Error", status, data.code);
      }
    }

    if (error.request) {
      throw new ApiError("Network Error", 0, "NETWORK_ERROR");
    }

    throw new ApiError("Unknown Error", 0, "UNKNOWN_ERROR");
  }
}
```

## Security Best Practices

### Input Sanitization and Validation

```typescript
import DOMPurify from 'dompurify';
import { z } from 'zod';

// HTML sanitization
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

// Input validation schemas
const emailSchema = z.string().email().max(254);
const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number, and special character');

const userInputSchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in name'),
  email: emailSchema,
  message: z.string().min(1).max(1000),
});

// Safe component for rendering user content
type SafeContentProps = {
  content: string;
  maxLength?: number;
}

const SafeContent: React.FC<SafeContentProps> = ({
  content,
  maxLength = 1000
}) => {
  const sanitizedContent = useMemo(() => {
    const truncated = content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content;
    return sanitizeHtml(truncated);
  }, [content, maxLength]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
```

### XSS Prevention

```typescript
// Safe URL validation
const isSafeUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

// Safe link component
type SafeLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SafeLink: React.FC<SafeLinkProps> = ({ href, children, className }) => {
  if (!isSafeUrl(href)) {
    return <span className={className}>{children}</span>;
  }

  const isExternal = !href.startsWith('/') && !href.startsWith('#');

  return (
    <a
      href={href}
      className={className}
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {children}
    </a>
  );
};
```

## Testing Guidelines

### Unit Testing Structure

```typescript
// Component test example
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from './UserProfile';
import { userService } from '@/services/userService';

// Mock the service
jest.mock('@/services/userService');
const mockUserService = userService as jest.Mocked<typeof userService>;

// Test utilities
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information correctly', async () => {
    mockUserService.getUserById.mockResolvedValue(mockUser);

    renderWithProviders(<UserProfile userId="1" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('handles edit button click', async () => {
    const onEdit = jest.fn();
    mockUserService.getUserById.mockResolvedValue(mockUser);

    renderWithProviders(
      <UserProfile userId="1" onEdit={onEdit} />
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith('1');
  });
});
```

### Testing Best Practices

1. **Test user behavior, not implementation details**
2. **Use data-testid sparingly, prefer role-based queries**
3. **Mock external dependencies at the boundary**
4. **Write descriptive test names**
5. **Use setup and teardown appropriately**
6. **Test error states and edge cases**

## Accessibility

### ARIA and Semantic HTML

```typescript
// Proper semantic HTML and ARIA usage
const AccessibleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const titleId = useId();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap implementation
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 id={titleId} className="text-xl font-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Keyboard Navigation

```typescript
// Accessible dropdown component
const AccessibleDropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          onSelect(items[focusedIndex]);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev =>
            prev < items.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev =>
            prev > 0 ? prev - 1 : items.length - 1
          );
        }
        break;
    }
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="px-4 py-2 border rounded-md"
      >
        {trigger}
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          role="listbox"
          className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg"
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              role="option"
              aria-selected={index === focusedIndex}
              className={`px-4 py-2 cursor-pointer ${
                index === focusedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Development Workflow

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/user-management
git add .
git commit -m "feat: add user management interface"
git push origin feature/user-management

# Commit message format
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### Code Review Checklist

- [ ] **Functionality**: Does the code work as expected?
- [ ] **TypeScript**: Are types properly defined and used?
- [ ] **Performance**: Are there any performance concerns?
- [ ] **Security**: Are inputs validated and sanitized?
- [ ] **Accessibility**: Is the UI accessible to all users?
- [ ] **Testing**: Are there adequate tests?
- [ ] **Documentation**: Is the code well-documented?
- [ ] **Consistency**: Does it follow our conventions?

### Development Commands

```bash
# Development
npm run dev                # Start development server
npm run build             # Build for production
npm run start             # Start production server
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run format            # Format with Prettier
npm run type-check        # TypeScript type checking
npm test                  # Run tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate test coverage
```

### Environment Configuration

```typescript
// Environment variables validation
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);

// Type-safe environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
```

### Configuration Files

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["example.com"],
    formats: ["image/webp", "image/avif"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
  ],
};

export default nextConfig;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
```

## Best Practices Summary

### Code Quality

1. **Consistent naming conventions** across all files and variables
2. **Type safety** with comprehensive TypeScript usage
3. **Component reusability** through proper abstraction
4. **Performance optimization** with memoization and lazy loading
5. **Error handling** at all levels of the application

### Security

1. **Input validation** and sanitization
2. **XSS prevention** with safe content rendering
3. **CSRF protection** for state-changing operations
4. **Content Security Policy** implementation
5. **Secure authentication** and authorization

### Accessibility

1. **Semantic HTML** structure
2. **ARIA attributes** for screen readers
3. **Keyboard navigation** support
4. **Color contrast** compliance
5. **Focus management** in interactive components

### Performance

1. **Code splitting** for optimal bundle sizes
2. **Image optimization** with Next.js Image component
3. **Caching strategies** for API responses
4. **Lazy loading** for non-critical components
5. **Bundle analysis** and optimization

### Maintainability

1. **Clear project structure** with logical organization
2. **Comprehensive documentation** and comments
3. **Consistent code formatting** with Prettier
4. **Automated testing** for critical functionality
5. **Version control** best practices

---

**Remember**: These conventions are living guidelines that should evolve with the project and team needs. Regular review and updates ensure they remain relevant and useful.

**For Questions**: Create an issue or discussion in the project repository for clarification or suggestions for improvements to these conventions.

# Development

npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint
npm run lint:fix # Fix ESLint issues
npm run format # Format with Prettier
npm run type-check # TypeScript type checking
npm test # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate test coverage

````

### Environment Configuration

```typescript
// Environment variables validation
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);

// Type-safe environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
````

### Configuration Files

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["example.com"],
    formats: ["image/webp", "image/avif"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
  ],
};

export default nextConfig;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
```

## Best Practices Summary

### Code Quality

1. **Consistent naming conventions** across all files and variables
2. **Type safety** with comprehensive TypeScript usage
3. **Component reusability** through proper abstraction
4. **Performance optimization** with memoization and lazy loading
5. **Error handling** at all levels of the application

### Security

1. **Input validation** and sanitization
2. **XSS prevention** with safe content rendering
3. **CSRF protection** for state-changing operations
4. **Content Security Policy** implementation
5. **Secure authentication** and authorization

### Accessibility

1. **Semantic HTML** structure
2. **ARIA attributes** for screen readers
3. **Keyboard navigation** support
4. **Color contrast** compliance
5. **Focus management** in interactive components

### Performance

1. **Code splitting** for optimal bundle sizes
2. **Image optimization** with Next.js Image component
3. **Caching strategies** for API responses
4. **Lazy loading** for non-critical components
5. **Bundle analysis** and optimization

### Maintainability

1. **Clear project structure** with logical organization
2. **Comprehensive documentation** and comments
3. **Consistent code formatting** with Prettier
4. **Automated testing** for critical functionality
5. **Version control** best practices

---

**Remember**: These conventions are living guidelines that should evolve with the project and team needs. Regular review and updates ensure they remain relevant and useful.

**For Questions**: Create an issue or discussion in the project repository for clarification or suggestions for improvements to these conventions.
