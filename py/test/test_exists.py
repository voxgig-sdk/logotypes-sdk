# ProjectName SDK exists test

import pytest
from logotypes_sdk import LogotypesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LogotypesSDK.test(None, None)
        assert testsdk is not None
