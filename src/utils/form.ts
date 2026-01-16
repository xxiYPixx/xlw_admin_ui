export const toFormData = <T extends object>(data: T) => {
    const params = new URLSearchParams()
    Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value))
        }
    })
    return params
}
