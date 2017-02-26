describe('localize', () => {

    let xhr, requests, testTag;

    beforeEach(() => {
        // Stub HTTP
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (req) {
            requests.push(req);
        };

        // Create DOM element to translate
        testTag = document.createElement('h1');
        testTag.innerHTML = 'Test text';
        testTag.setAttribute('translate', 'header.text');
        document.body.appendChild(testTag);
    });

    afterEach(() => {
        xhr.restore();
        document.body.innerHTML = '';
    });

    it('should set innerHTML when initLoc is true', (done) => {
        const options = {
            initLoc: true,
            defaultLang: 'zz'
        };
        const localize = require('./localize.js')(options);
        const expected = 'some header text';
        
        requests[0].respond(200, {
            'Content-Type': 'application/json'
        }, `{ "header.text": "${expected}" }`);

        window.setTimeout(() => {
            expect(testTag.innerHTML).to.equal(expected);
            done();
        }, 0)
    });

    describe('translate', () => {
        it('should set DOM text to specified lang when localize is called', (done) => {
            const localize = require('./localize.js')();
            const expected = 'some header text';

            localize
                .translate('zz')
                .then(() => {
                    expect(testTag.innerHTML).to.equal(expected);
                    done();
                });

            requests[1].respond(200, {
                'Content-Type': 'application/json'
            }, `{ "header.text": "${expected}" }`);
        });
    });
});