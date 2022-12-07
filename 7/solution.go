package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {

	content, err := os.ReadFile("input.txt")
	input := string(content)
	if err != nil {
		log.Fatal(err)
	}

	directoriesSizes := map[string]int{}
	var path []string

	for _, line := range strings.Split(input, ("\n")) {
		command := ""
		if string(line)[0:1] == "$" {
			command = string(line)[2:]
		}

		if len(command) > 0 {
			if strings.Contains(command, "cd") {
				requestedPath := command[3:]
				if requestedPath == "/" {
					path = path[:0]
					path = append(path, "/")
				} else if requestedPath == ".." {
					path = path[:len(path)-1]
				} else {
					path = append(path, requestedPath)
				}
			}
		} else {
			listedItem := string(line)
			if !strings.Contains(listedItem, "dir") {
				split := strings.Split(listedItem, " ")
				size, err := strconv.Atoi(split[0])
				if err != nil {
				}
				var incrementalPath string
				for _, dir := range path {
					if dir != "/" {
						if incrementalPath == "/" {
							incrementalPath = incrementalPath + dir
						} else {
							incrementalPath = incrementalPath + "/" + dir
						}
					} else {
						incrementalPath = "/"
					}
					if _, ok := directoriesSizes[incrementalPath]; ok {
						directoriesSizes[incrementalPath] += size
					} else {
						directoriesSizes[incrementalPath] = size
					}
				}
			}
		}
	}

	sizesUnder10k := 0
	for _, value := range directoriesSizes {
		if value <= 100000 {
			// fmt.Println("directory %v, size %v\n", "dir", value)
			sizesUnder10k += value
		}
	}

	fmt.Println(sizesUnder10k) // 1491614

	// PART 2

	diskSize := 70000000
	diskUsage := directoriesSizes["/"]
	spaceNeeded := 30000000

	toFreeUp := spaceNeeded - (diskSize - diskUsage)

	smallestThatFits := diskSize

	for _, value := range directoriesSizes {
		if value >= toFreeUp && value < smallestThatFits {
			// fmt.Println("directory %v, size %v\n", "dir", value)
			smallestThatFits = value
		}
	}

	fmt.Println(smallestThatFits) // 6400111
}
