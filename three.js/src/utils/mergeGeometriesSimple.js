// src/utils/mergeGeometriesSimple.js
import * as THREE from 'three';

/**
 * Merge an array of BufferGeometry into one BufferGeometry.
 * @param {THREE.BufferGeometry[]} geometries
 * @returns {THREE.BufferGeometry}
 */
export function mergeGeometriesSimple(geometries) {
    const merged = new THREE.BufferGeometry();
    let offset = 0;
    const attributes = {};

    // Merge indices
    const hasIndex = geometries[0].index !== null;
    if (hasIndex) {
        const mergedIndex = [];
        let indexOffset = 0;
        geometries.forEach(geo => {
            const indexArray = geo.index.array;
            for (let i = 0; i < indexArray.length; i++) {
                mergedIndex.push(indexArray[i] + indexOffset);
            }
            indexOffset += geo.attributes.position.count;
        });
        merged.setIndex(mergedIndex);
    }

    // Collect and merge attributes
    Object.keys(geometries[0].attributes).forEach(name => {
        const attrList = geometries.map(geo => geo.attributes[name]);
        const itemSize = attrList[0].itemSize;
        const arrayType = attrList[0].array.constructor;
        const totalLength = attrList.reduce((sum, a) => sum + a.array.length, 0);
        const mergedArray = new arrayType(totalLength);
        let ptr = 0;
        attrList.forEach(a => {
            mergedArray.set(a.array, ptr);
            ptr += a.array.length;
        });
        merged.setAttribute(name, new THREE.BufferAttribute(mergedArray, itemSize));
    });

    return merged;
}
