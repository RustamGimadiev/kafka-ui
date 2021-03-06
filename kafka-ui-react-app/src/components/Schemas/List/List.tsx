import React from 'react';
import { SchemaSubject } from 'generated-sources';
import { NavLink, useParams } from 'react-router-dom';
import { clusterSchemaNewPath } from 'lib/paths';
import { ClusterName } from 'redux/interfaces';
import PageLoader from 'components/common/PageLoader/PageLoader';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import ClusterContext from 'components/contexts/ClusterContext';
import ListItem from './ListItem';

export interface ListProps {
  schemas: SchemaSubject[];
  isFetching: boolean;
  fetchSchemasByClusterName: (clusterName: ClusterName) => void;
}

const List: React.FC<ListProps> = ({
  schemas,
  isFetching,
  fetchSchemasByClusterName,
}) => {
  const { isReadOnly } = React.useContext(ClusterContext);
  const { clusterName } = useParams<{ clusterName: string }>();

  React.useEffect(() => {
    fetchSchemasByClusterName(clusterName);
  }, [fetchSchemasByClusterName, clusterName]);

  return (
    <div className="section">
      <Breadcrumb>Schema Registry</Breadcrumb>
      <div className="box">
        <div className="level">
          {!isReadOnly && (
            <div className="level-item level-right">
              <NavLink
                className="button is-primary"
                to={clusterSchemaNewPath(clusterName)}
              >
                Create Schema
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {isFetching ? (
        <PageLoader />
      ) : (
        <div className="box">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Schema Name</th>
                <th>Version</th>
                <th>Compatibility</th>
              </tr>
            </thead>
            <tbody>
              {schemas.length > 0 ? (
                schemas.map((subject) => (
                  <ListItem key={subject.id} subject={subject} />
                ))
              ) : (
                <tr>
                  <td colSpan={10}>No schemas found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
