// src/utils/mergeGeometries.js
import * as THREE from 'three';

/**
 * Merge an array of BufferGeometry into one.
 */
export function mergeBufferGeometriesSimple(geometries, useGroups = false) {
    const isIndexed = geometries[0].index !== null;
    const mergedGeometry = new THREE.BufferGeometry();

    // Merge indices if present
    if (isIndexed) {
        let offset = 0;
        const mergedIndex = [];
        geometries.forEach((geo) => {
            const index = geo.index.array;
            for (let i = 0; i < index.length; i++) {
                mergedIndex.push(index[i] + offset);
            }
            offset += geo.attributes.position.count;
        });
        mergedGeometry.setIndex(mergedIndex);
    }

    // Merge attributes
    const attrs = Object.keys(geometries[0].attributes);
    attrs.forEach((name) => {
        const arrays = geometries.map((geo) => geo.attributes[name].array);
        const itemSize = geometries[0].attributes[name].itemSize;
        const arrayType = geometries[0].attributes[name].array.constructor;
        const mergedArray = new arrayType(arrays.reduce((sum, arr) => sum + arr.length, 0));
        let pos = 0;
        arrays.forEach((arr) => {
            mergedArray.set(arr, pos);
            pos += arr.length;
        });
        mergedGeometry.setAttribute(name, new THREE.BufferAttribute(mergedArray, itemSize));
    });

    // Optionally groups
    if (useGroups) {
        let start = 0;
        geometries.forEach((geo, idx) => {
            const count = isIndexed ? geo.index.count : geo.attributes.position.count;
            mergedGeometry.addGroup(start, count, idx);
            start += count;
        });
    }

    return mergedGeometry;
}
