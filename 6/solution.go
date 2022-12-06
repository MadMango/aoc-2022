package main

import (
	"fmt"
	"log"
	"os"
)

func countUnique(es string) int {

	unique := 0

	m := map[string]bool{}
	for _, v := range es {
		if _, ok := m[string(v)]; !ok {
			m[string(v)] = true
			unique += 1
		}
	}
	return unique
}

func findStartOfPacketMarker(input string, howManyUnique int) int {
	var indexOfLastCharInPacketMarker int

	for index := range input[howManyUnique-1:] {
		actualIndex := index + howManyUnique
		fourChars := input[actualIndex-howManyUnique : actualIndex]
		uniqueCount := countUnique(fourChars)

		if uniqueCount == howManyUnique {
			indexOfLastCharInPacketMarker = actualIndex
			break
		}
	}

	return indexOfLastCharInPacketMarker
}

func main() {

	content, err := os.ReadFile("input.txt")
	input := string(content)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(findStartOfPacketMarker(input, 4))  // 1531
	fmt.Println(findStartOfPacketMarker(input, 14)) // 2518
}
