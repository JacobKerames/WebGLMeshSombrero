// Helper function to create a 4D vector
function vec4(x, y, z, w) {
    return Float32Array.of(x, y, z, w);
}
// Helper function to create a 3D vector
function vec3(x, y, z) {
    return Float32Array.of(x, y, z);
}
function mat4() {
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}
// Helper function to create a 4x4 rotation matrix
function rotate(angle, axis) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const x = axis[0];
    const y = axis[1];
    const z = axis[2];

    return Float32Array.of(
        x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, 0,
        y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, 0,
        x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c, 0,
        0, 0, 0, 1
    );
}
function mult(matrix1, matrix2) {
    const result = new Float32Array(16);
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            let sum = 0;
            for (let k = 0; k < 4; ++k) {
                sum += matrix1[4 * i + k] * matrix2[4 * k + j];
            }
            result[4 * i + j] = sum;
        }
    }
    return result;
}
// Helper function to create a 4x4 perspective matrix
function perspective(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const nf = 1.0 / (near - far);
    const proj = new Float32Array(16);
    proj.set(Float32Array.of(
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0
    ));
    return proj;
}
// Helper function to create a 4x4 look-at matrix
function lookAt(eye, center, up) {
    const zAxis = vec3(...eye).subtract(center).normalize();
    const xAxis = vec3(...up).cross(zAxis).normalize();
    const yAxis = zAxis.cross(xAxis);

    const modelView = new Float32Array(16);
    modelView.set(Float32Array.of(
        xAxis[0], yAxis[0], zAxis[0], 0,
        xAxis[1], yAxis[1], zAxis[1], 0,
        xAxis[2], yAxis[2], zAxis[2], 0,
        -xAxis.dot(eye), -yAxis.dot(eye), -zAxis.dot(eye), 1
    ));
    return modelView;
}
// Helper function to flatten an array of vec4s into a 1D array of floats
function flatten(arr) {
    const flatArray = new Float32Array(arr.length * 4);
    let index = 0;
    for (const vec of arr) {
        flatArray[index++] = vec[0];
        flatArray[index++] = vec[1];
        flatArray[index++] = vec[2];
        flatArray[index++] = vec[3];
    }
    return flatArray;
}
// Add vector manipulation methods to the Float32Array prototype
Float32Array.prototype.add = function (vec) {
    return Float32Array.of(
        this[0] + vec[0],
        this[1] + vec[1],
        this[2] + vec[2]
    );
};

Float32Array.prototype.subtract = function (vec) {
    return Float32Array.of(
        this[0] - vec[0],
        this[1] - vec[1],
        this[2] - vec[2]
    );
};

Float32Array.prototype.normalize = function () {
    const length = Math.sqrt(this.dot(this));
    return this.map(x => x / length);
};

Float32Array.prototype.cross = function (vec) {
    return Float32Array.of(
        this[1] * vec[2] - this[2] * vec[1],
        this[2] * vec[0] - this[0] * vec[2],
        this[0] * vec[1] - this[1] * vec[0]
    );
};

Float32Array.prototype.dot = function (vec) {
    return this[0] * vec[0] + this[1] * vec[1] + this[2] * vec[2];
};
function add(v1, v2) {
    // Create a new array to store the result
    const result = [];
  
    // Loop through the elements of v1 and v2 and add them
    for (let i = 0; i < v1.length; i++) {
      result.push(v1[i] + v2[i]);
    }
  
    // Return the result
    return result;
  }