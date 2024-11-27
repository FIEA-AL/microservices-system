import http from "./config";


class UserService{
    static async saveUser(email: string, password: string, router: any) {
        const user = {
          email: email,
          password: password,
        };
  
        try {
          const response = await http.post('http://localhost:3000/users', {
            headers: {
              'Content-Type': 'application/json',
            },
            body: user,
          });
  
          if (response.status == 200) {
            alert('New user saved');
            router.push('/login');
          }
        } catch (error) {
          console.error('Error saving user:', error);
          alert('Error saving user.');
        }
      }
    
    static async login(email: string, password: string, router: any) {
        const user = {
            email: email,
            password: password,
        };

        try {
            const response = await http.post('http://localhost:3000/auth/login', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: user,
            });

            if (response.status == 200) {
                const data = response.data
                alert('Login successful!');
                // Store the token for authenticated requests
                localStorage.setItem('authToken', data.token);
                // Redirect to the home page
                router.push('/');
            } else {
                const errorData = response.data
                alert(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    }

    static async getUserById(id: string): Promise<{} | undefined> {
        try {

          const response = await http.get(`http://localhost:3000/users/${id}`, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });

          if (response.status == 200){
            return response.data
          }
          else{
            return 
          }
        } catch (error) {
          console.error('Error fetching QR codes:', error);
          alert('Error fetching QR codes.');
          return '';
        }
    }
}


export { UserService };