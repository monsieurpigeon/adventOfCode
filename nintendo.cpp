#include <iostream>
#include <iomanip>
#include <bitset>

using namespace std;

int main()
{
  int size;

  // cin >> size;
  size = 32;

  unsigned int* a = new unsigned int[size / 16]; // <- input tab to encrypt
  unsigned int* b = new unsigned int[size / 16]; // <- output tab
 
  // for (int i = 0; i < size / 16; i++) {   // Read size / 16 integers to a
  //   cin >> hex >> a[i];
  // }
  a[0] = 0b11111111111111111111111111111110;
  a[1] = 0b11111111111111111111111111111110;

  for (int i = 0; i < size / 16; i++) {   // Write size / 16 zeros to b
    b[i] = 0;
  }
 
  for (int i = 0; i < size; i++)
    for (int j = 0; j < size; j++) {

cout << i << ", " << j << " / ";
      std::bitset<32> z(b[(i + j) / 32]);
      cout << z << "^=( (";
    std::bitset<32> y1( a[i / 32]);
    std::bitset<32> y2( a[j / 32 + size / 32] );


    cout << y1 << " >> " << i % 32 << " & " << y2 << " >> " << j % 32 << " & " << 1 << ") << " << (i + j) % 32 << ") = ";

      b[(i + j) / 32] ^= ( (a[i / 32] >> (i % 32)) &
		       (a[j / 32 + size / 32] >> (j % 32)) & 1 ) << ((i + j) % 32);   // Magic centaurian operation
      
      // b[(i + j) / 32] ^= ((a[0] >> i) & (a[1] >> j) & 1) << ((i + j) % 32)

    std::bitset<32> x(b[(i + j) / 32]);
      cout << x << "   ::   ";
    for(int i = 0; i < size / 16; i++) {
      
      if (i > 0) {
        cout << " ";
      }
      cout << setfill('0') << setw(8) << hex << b[i];       // print result
    }
    cout << '\n';
  }
 
  for(int i = 0; i < size / 16; i++) {
    if (i > 0) {
      cout << ' ';
    }
    cout << setfill('0') << setw(8) << hex << b[i];       // print result
  }
  cout << endl;

 /*
    Good luck humans
 */
  return 0;
}
