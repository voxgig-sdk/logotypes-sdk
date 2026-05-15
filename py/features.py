# Logotypes SDK feature factory

from feature.base_feature import LogotypesBaseFeature
from feature.test_feature import LogotypesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LogotypesBaseFeature(),
        "test": lambda: LogotypesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
