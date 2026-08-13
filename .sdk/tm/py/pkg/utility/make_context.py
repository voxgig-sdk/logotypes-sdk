# Logotypes SDK utility: make_context

from projectname_sdk.core.context import LogotypesContext


def make_context_util(ctxmap, basectx):
    return LogotypesContext(ctxmap, basectx)
