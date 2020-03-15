use std::fs;

fn main() {
    let contents = fs::read_to_string("../inputs/d02.txt")
    .expect("Something went wrong reading the file");

    let mut papier = 0;
    let mut ruban = 0;
    for line in contents.lines() {
        let a: Vec<&str> = line.split('x').collect();
        let mut v: Vec<i32> = vec![a[0].parse().unwrap(), a[1].parse().unwrap(), a[2].parse().unwrap()];
        v.sort();
        papier = papier + 2 * ( v[0] * v[1] + v[1] * v[2] + v[2] * v[0]) + v[0] * v[1];
        ruban = ruban + 2 * v[0] + 2 * v[1] + v[0] * v[1] * v[2];
    }
    println!("papier\n{}", papier);
    println!("ruban\n{}", ruban);
}