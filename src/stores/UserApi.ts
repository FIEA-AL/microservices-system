import { defineStore } from 'pinia';

export const useUserApi = defineStore('UserApi', {
  actions: {
    async saveUser(email: string, password: string, router: any) {
      const user = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          alert('New user saved');
          // Redirect to the login page
          router.push('/login');
        } else {
          alert('Failed to save user.');
        }
      } catch (error) {
        console.error('Error saving user:', error);
        alert('Error saving user.');
      }
    },

    async login(email: string, password: string, router: any) {
      const user = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Login successful!');
          // Store the token for authenticated requests
          localStorage.setItem('authToken', data.token);
          // Redirect to the home page
          router.push('/');
        } else {
          const errorData = await response.json();
          alert(`Login failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
      }
    },
  },
});
