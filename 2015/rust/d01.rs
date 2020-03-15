use std::fs;

fn main() {
    let mut total = 0;
    let mut first = true;
    let contents = fs::read_to_string("../inputs/d01.txt")
        .expect("Something went wrong reading the file");
    for (index, char) in contents.chars().enumerate() {
        total = if char == '(' {
            total + 1
        } else {
            total - 1
        };
        if total == -1 && first {
            first = false;
            print!("premiere fois au sous-sol\n{}\n", index + 1);
        }
    }
    print!("dernier etage atteint\n{}\n", total);
}