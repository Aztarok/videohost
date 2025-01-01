function converByteToMegabyte(size: number) {
    return `${((size ?? 0) / (1024 * 1000)).toFixed(2)} MB`;
}

export { converByteToMegabyte };
