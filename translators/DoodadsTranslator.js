let BufferedHexFileWriter = require('../lib/BufferedHexFileWriter'),
    outBuffer;

const DoodadsTranslator = function(doodadsJson) {
    outBuffer = new BufferedHexFileWriter();

    /*
     * Header
     */
    outBuffer.addString('W3do'); // file id
    outBuffer.addInt(8); // file version
    outBuffer.addInt(11); // subversion 0x0B
    outBuffer.addInt(doodadsJson.length); // num of trees

    /*
     * Body
     */
    doodadsJson.forEach(function(tree) {
        outBuffer.addString(tree.type);
        outBuffer.addInt(tree.variation || 0); // optional - default value 0
        outBuffer.addFloat(tree.position[0]);
        outBuffer.addFloat(tree.position[1]);
        outBuffer.addFloat(tree.position[2]);
        outBuffer.addFloat(tree.angle || 0); // optional - default value 0

        // Scale
        if(!tree.scale) tree.scale = [1, 1, 1];
        outBuffer.addFloat(tree.scale[0] || 1);
        outBuffer.addFloat(tree.scale[1] || 1);
        outBuffer.addFloat(tree.scale[2] || 1);

        outBuffer.addByte(2); // NOT SUPPORTED: flags
        outBuffer.addByte(tree.life || 100);
        outBuffer.addInt(0); // NOT SUPPORTED: random item table pointer: fixed to 0
        outBuffer.addInt(0); // NOT SUPPORTED: number of items dropped for item table
        outBuffer.addInt(tree.id);
    });

    /*
     * Footer
     */
    outBuffer.addInt(0); // special doodad format number, fixed at 0x00
    outBuffer.addInt(0); // NOT SUPPORTED: number of special doodads

    return {
        errors: [],
        buffer: outBuffer.getBuffer()
    };
};

module.exports = DoodadsTranslator;
