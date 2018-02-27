function isMatch(name, searchTerm) {
  return name.toLowerCase().includes(searchTerm);
}

function filterItems(items, searchTerm) {
  function filterNode(node) {
    const hasChildItems = node.children != null && node.children.length > 0;
    const matchingChildItems = filterItems(node.children, searchTerm);
    if (hasChildItems && matchingChildItems.length === node.children.length) {
      return node;
    }
    if (matchingChildItems == null || matchingChildItems.length === 0) {
      return isMatch(node.name, searchTerm)
        ? { ...node, children: matchingChildItems }
        : null;
    }
    return {
      ...node,
      children: matchingChildItems,
    };
  }

  if (items == null || items.length === 0) {
    return items;
  }
  const filteredItems = items.map(filterNode).filter(item => item != null);
  if (items.every((item, index) => item === filteredItems[index])) {
    return items;
  }
  return filteredItems;
}

export function filterTree(items, searchTerm) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  if (normalizedSearchTerm.length === 0) {
    return items;
  }
  return filterItems(items, normalizedSearchTerm);
}
