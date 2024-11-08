window.onload = async () => {
    await loadSlider();
    await loadCategory();
    await loadProducts(null, 'Popular');
}

