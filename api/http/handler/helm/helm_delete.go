package helm

import (
	"net/http"

	"github.com/portainer/libhelm/options"
	httperror "github.com/portainer/libhttp/error"
	"github.com/portainer/libhttp/request"
	"github.com/portainer/libhttp/response"
)

// @id HelmDelete
// @summary Delete Helm Release
// @description
// @description **Access policy**: authorized
// @tags helm
// @security jwt
// @accept json
// @produce json
// @param id path int true "Endpoint identifier"
// @param release path string true "The name of the release/application to uninstall"
// @param namespace query string true "An optional namespace"
// @success 204 "Success"
// @failure 400 "Invalid endpoint id or bad request"
// @failure 401 "Unauthorized"
// @failure 404 "Endpoint or ServiceAccount not found"
// @failure 500 "Server error or helm error"
// @router /endpoints/{id}/kubernetes/helm/{release} [delete]
func (handler *Handler) helmDelete(w http.ResponseWriter, r *http.Request) *httperror.HandlerError {
	release, err := request.RetrieveRouteVariableValue(r, "release")
	if err != nil {
		return &httperror.HandlerError{http.StatusBadRequest, "No release specified", err}
	}

	clusterAccess, httperr := handler.getHelmClusterAccess(r)
	if httperr != nil {
		return httperr
	}

	uninstallOpts := options.UninstallOptions{
		Name:                    release,
		KubernetesClusterAccess: clusterAccess,
	}

	q := r.URL.Query()
	if namespace := q.Get("namespace"); namespace != "" {
		uninstallOpts.Namespace = namespace
	}

	err = handler.helmPackageManager.Uninstall(uninstallOpts)
	if err != nil {
		return &httperror.HandlerError{http.StatusInternalServerError, "Helm returned an error", err}
	}

	return response.Empty(w)
}