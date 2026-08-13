# Logotypes SDK feature factory

from logotypes_sdk.feature.base_feature import LogotypesBaseFeature
from logotypes_sdk.feature.test_feature import LogotypesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LogotypesBaseFeature(),
        "test": lambda: LogotypesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
