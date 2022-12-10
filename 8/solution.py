import pandas as pd

tree_grid = pd.read_csv('./input.txt', header=None)
tree_grid = tree_grid[0].apply(lambda x: pd.Series(list(x)))

cols_count = tree_grid.columns.size
rows_count = len(tree_grid)

def check_if_all_trees_are_shorter(tree, trees):
  return all(i < tree for i in trees)

visible_count = 0

def is_visible(row_index, col_index):
  global visible_count
  if row_index == 0 or row_index == rows_count - 1:
    visible_count += 1
    return True
  if col_index == 0 or col_index == cols_count - 1:
    visible_count += 1
    return True
  
  trees_in_row = tree_grid.iloc[[row_index]].values.tolist()[0]
  trees_in_column = tree_grid.iloc[:, col_index].tolist()
  current_tree = trees_in_row[col_index]

  trees_on_the_left = trees_in_row[:col_index]
  trees_on_the_right = trees_in_row[col_index + 1:]
  trees_above = trees_in_column[:row_index]
  trees_below = trees_in_column[row_index + 1 :]

  if check_if_all_trees_are_shorter(current_tree, trees_on_the_left):
    visible_count += 1
    return True
  if check_if_all_trees_are_shorter(current_tree, trees_on_the_right):
    visible_count += 1
    return True

  if check_if_all_trees_are_shorter(current_tree, trees_above):
    visible_count += 1
    return True
  if check_if_all_trees_are_shorter(current_tree, trees_below):
    visible_count += 1
    return True

  return False

tree_grid.apply(lambda row: pd.DataFrame(row).apply(lambda col: is_visible(row.name, col.name), axis=1))
print(visible_count) # 1684

# PART 2

highest_scenic_score = 0

def calculate_scenic_score(tree, trees):
  viewing_distance = 0
  for each_tree in trees:
    if each_tree < tree:
      viewing_distance += 1
    else:
      viewing_distance += 1
      break

  return viewing_distance

def find_highest_scenic_score(row_index, col_index):
  global highest_scenic_score
  
  trees_in_row = tree_grid.iloc[[row_index]].values.tolist()[0]
  trees_in_column = tree_grid.iloc[:, col_index].tolist()
  current_tree = trees_in_row[col_index]

  trees_on_the_left = trees_in_row[:col_index]
  trees_on_the_right = trees_in_row[col_index + 1:]
  trees_above = trees_in_column[:row_index]
  trees_below = trees_in_column[row_index + 1 :]

  scenic_score_left = calculate_scenic_score(current_tree, trees_on_the_left[::-1])
  scenic_score_right = calculate_scenic_score(current_tree, trees_on_the_right)

  scenic_score_up = calculate_scenic_score(current_tree, trees_above[::-1])
  scenic_score_down = calculate_scenic_score(current_tree, trees_below)

  combined_scenic_score = scenic_score_left * scenic_score_right * scenic_score_up * scenic_score_down

  if combined_scenic_score > highest_scenic_score:
    highest_scenic_score = combined_scenic_score

  return False

tree_grid.apply(lambda row: pd.DataFrame(row).apply(lambda col: find_highest_scenic_score(row.name, col.name), axis=1))

print(highest_scenic_score) # 486540
