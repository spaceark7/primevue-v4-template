// Types for Peruri API responses
interface PeruriApiResponse<T> {
  resultCode: string;
  resultDesc: string;
  data: T;
}

interface JwtData {
  jwt: string;
  expiredDate: string;
}

class PeruriService {
  private readonly baseUrl = 'https://apgdev.peruri.co.id:19044/gateway';
  private readonly apiKey = '8670db4a-680b-4ebb-95b0-d149f01377d5';
  private readonly tokenKey = 'peruri_jwt';
  private readonly expiryKey = 'peruri_jwt_expiry';
  private readonly systemId = 'PT-RET';

  /**
   * Clears the stored JWT token and expiry date
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiryKey);
  }

  /**
   * Get JSON Web Token from Peruri API
   * First checks localStorage, if token exists and is not expired, returns it
   * Otherwise, fetches a new token, stores it, and returns it
   * @returns Promise with the JWT token
   */
  async getToken(): Promise<string> {
    try {
      // Check if we have a stored token and expiration date
      const storedToken = localStorage.getItem('peruri_jwt');
      const storedExpiry = localStorage.getItem('peruri_jwt_expiry');

      if (storedToken && storedExpiry) {
        const expiryDate = new Date(storedExpiry);
        const now = new Date();

        // If token isn't expired yet, return it
        if (expiryDate > now) {
          return storedToken;
        }
      }

      // If no valid token found, fetch a new one
      const response = await fetch(
        `${this.baseUrl}/jwtSandbox/1.0/getJsonWebToken/v1`,
        {
          method: 'POST',
          headers: {
            'x-Gateway-APIKey': this.apiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            param: {
              systemId: this.systemId,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = (await response.json()) as PeruriApiResponse<JwtData>;

      if (result.resultCode !== '0') {
        throw new Error(`API error: ${result.resultDesc}`);
      }

      // Store the new token and its expiry date
      localStorage.setItem('peruri_jwt', result.data.jwt);
      localStorage.setItem('peruri_jwt_expiry', result.data.expiredDate);

      return result.data.jwt;
    } catch (error) {
      console.error('Error fetching JWT token:', error);
      throw error;
    }
  }
}
export default new PeruriService();
